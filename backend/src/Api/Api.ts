'use strict';

import axios, {AxiosStatic} from 'axios';

import {getTokensFromFile as _getTokensFromFile, setTokensToFile as _setTokensToFile, Tokens} from '../utils/utils';
import {client_id, client_secret} from "../../utils/constants";
import {AmoCRMResponses} from "./types/Api";
import {assertIsDefined, assertIsValidTokens} from "../typeguards/typeguards";
import { ApiResponses } from "../../../frontand/src/api/api";
import {ContactCustomFieldsValuesTypes} from "../../../frontand/src/api/constants";
import * as fs from 'fs';

// todo: все enums должны быть в .d.ts файле, надо разобраться, как заставить TS компилировать эти const enums
export const enum ERROR_AMOCRM_CODES {
  /** Когда токены протухают - получаем такой код */
  Unauthorized = 401,
}

export class Api {
  private _tokens: Tokens;
  private _axios: AxiosStatic;

  /**
   * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
   */
  declare ['constructor']: typeof Api;

  constructor() {
    this._axios = this.constructor._getAxios();
  }

  public async getLeads(options: {
    query?: string,
  }): Promise<ApiResponses.GetLeadsDataReturn> {
    const {
      _axios,
    } = this;
    const {
      query,
    } = options;
    const {
      access,
    } = this.getTokensFromFile();

    const _queryResult = query ? `?query=${query}` : "";
    const response = await _axios<AmoCRMResponses.GetLeadsData>({
      method: 'GET',
      url: _createForGetRequestPath(`api/v4/leads${_queryResult}`),
      params: {
        with: "contacts",
      },
      headers: {
        ..._createAuthHeader(access),
      },
    });

    // 204 статус скажет о том, что по запросу ничего не найдено
    if (response.status === 204) {
      return [];
    }

    const leadsList = response.data._embedded.leads.map(({
       created_at,
       id,
       name,
       price,
       pipeline_id,
       responsible_user_id,
       status_id,
      _embedded: {
         contacts,
      },
     }) => ({
      created_at,
      id,
      name,
      pipeline_id,
      price,
      responsible_user_id,
      status_id,
      contacts,
    }));

    const leadsResult: ApiResponses.GetLeadsDataReturn = [];

    const mapTemporaryLocal_possibleStatusesList = new Map<number, AmoCRMResponses.Status>();
    const mapTemporaryLocal_users = new Map<number, AmoCRMResponses.GetUser>();

    for await (const currentLead of leadsList) {
      const {
        created_at,
        id,
        name,
        pipeline_id,
        price,
        responsible_user_id,
        status_id,
        contacts,
      } = currentLead;
      const currentLead_status: AmoCRMResponses.Status | undefined = await _getItem<AmoCRMResponses.Status>({
        accessToken: access,
        mapOfItemsLocal: mapTemporaryLocal_possibleStatusesList,
        requestPath: `api/v4/leads/pipelines/${pipeline_id}/statuses`,
        targetItemId: status_id,
        type: "status",
        axios: _axios,
      });

      assertIsDefined(currentLead_status);

      const currentLead_user: AmoCRMResponses.GetUser | undefined = await _getItem({
        accessToken: access,
        mapOfItemsLocal: mapTemporaryLocal_users,
        requestPath: `api/v4/users/${responsible_user_id}`,
        targetItemId: responsible_user_id,
        type: "user",
        axios: _axios,
      });

      assertIsDefined(currentLead_user);

      // todo: надо разобраться, может и контакты можно так же оптимизировать и брать локально контакт если его уже доставали для другой сделки
      //  что бы не доставать каждый раз заново один и тот же контакт, но возможно это не возможно и безсмысленно.
      //  Возможно у каждой сделки свои уникальные контакты, которые не возможно переиспользовать для других сделок, тогда и оптимизировать не получиться.
      const contactsListResult = await _getContactsListByIdentifiersList({
        accessToken: access,
        contactsIdentifiersList: contacts,
        axios: _axios,
      });

      leadsResult.push({
        created_at,
        id,
        name,
        pipeline_id,
        price,
        responsible_user: {
          name: currentLead_user.name,
          id: currentLead_user.id,
          email: currentLead_user.email,
        },
        status: {
          name: currentLead_status.name,
          /**
           * Цвет заливки статуса
           */// todo: Плохо, что есть backgroundColor и нет color, в идеале, апиха должна отдавать и то и другое
          backgroundColor: currentLead_status.color,
        },
        contacts: contactsListResult,
      });
    }

    return leadsResult;
  }

  public async updateTokens(refreshToken: string) {
    const response = await this._axios<AmoCRMResponses.TokensResponseData>({
      method: 'POST',
      url: _createForGetRequestPath("oauth2/access_token"),
      data: {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refreshToken,
        "grant_type": "refresh_token",
        "redirect_uri": "https://localhost.com",
    }});

    fs.writeFileSync('test/mock_tokens.json', JSON.stringify(response.data));

    const {
      data: {
        access_token,
        refresh_token,
      },
    } = response;

    this.setTokensToFile({
      access: access_token,
      refresh: refresh_token,
    });
  }

  getTokensFromFile(): Tokens {
    const {
      _tokens,
    } = this;

    if (_tokens) {
      return _tokens;
    }
    else {
      this._tokens = _getTokensFromFile();

      return this._tokens;
    }
  }

  setTokensToFile(tokens: Tokens) {
    _setTokensToFile(tokens);

    assertIsValidTokens(tokens);

    this._tokens = tokens;
  }

  protected static _getAxios(): AxiosStatic {
    return axios;
  }
}

function _createAuthHeader(accessToken: string) {
  return {
      "Authorization": `Bearer ${accessToken}`,
    }
}

const _createForGetRequestPath = (() => {
  const pathToAmoCRM = "https://araikrasoian.amocrm.ru";

  return function (endPath: string) {
    return `${pathToAmoCRM}${endPath ? "/" + endPath : ""}`
  }
})();

async function _getItem<T>(options: {
    mapOfItemsLocal: Map<number, object>,
    requestPath: string,
    targetItemId: number,
    accessToken: string,
    type: "status" | "user",
    axios: AxiosStatic,
}): Promise<T | undefined> {
  const {
    mapOfItemsLocal,
    requestPath,
    targetItemId,
    accessToken,
    type,
    axios,
  } = options;

  const possibleStatus_fromLocal = mapOfItemsLocal.get(targetItemId);

  // Сразу пытаемся найти статус в локальном массиве
  if (possibleStatus_fromLocal) {
    return possibleStatus_fromLocal as T;
  }
  // Если ещё его там нет, то дёргаем апи и не забываем сохранить статус, что бы потом опять не бегать с апихой за тем же самым статусом
  // todo: Логика статусов мне показалось странной, статусы с одним и тем же name оказывается имеют разные идентификаторы
  //  из-за этого кол-во запросов всё равно оптимизировалось не на 100%, мы по прежнему бегаем (уже не так часто, но всё же это не оптимизировано по прежнему)
  //  за статусами с одним и тем же name
  //  Поскольку это тестовое задание, не стал здесь заострять сильно внимание, но в боевом режиме я бы здесь посидел подольше и разобрался бы,
  //  почему статусы с одинаковым name имеют разные идентификаторы и какой в этом смысл и можно ли здесь ещё оптимизировать лучше.
  else {
    const possibleStatusesList_response = await axios<
        AmoCRMResponses.GetStatusesList | AmoCRMResponses.GetUser
    >({
      method: 'GET',
      url: _createForGetRequestPath(requestPath),
      headers: {
        ..._createAuthHeader(accessToken),
      },
    });
    const {
      data: possibleStatusesList_data,
    } = possibleStatusesList_response;

    switch (type) {
      case "status": {
        const {
          _embedded: {
            statuses: possibleStatusesList_current,
          }
        } = possibleStatusesList_data as AmoCRMResponses.GetStatusesList;

        for (const status_current of possibleStatusesList_current) {
          mapOfItemsLocal.set(status_current.id, status_current);
        }

        break;
      }
      case "user": {
        const user = possibleStatusesList_data as AmoCRMResponses.GetUser;

        mapOfItemsLocal.set(user.id, user);

        break;
      }
      default: {
        throw new Error("Unknown type of object!");
      }
    }

    return mapOfItemsLocal.get(targetItemId) as T;
  }
}


async function _getContactsListByIdentifiersList(options: {
  accessToken: string,
  contactsIdentifiersList: AmoCRMResponses.ContactFromLead[],
  axios: AxiosStatic,
}): Promise<ApiResponses.Contact[]> {
  const {
    contactsIdentifiersList,
    accessToken,
    axios,
  } = options;

  const contactsList: ApiResponses.Contact[] = []

  for await (const currentContactRaw of contactsIdentifiersList) {
    const response_contact = await axios<AmoCRMResponses.Contact>({
      method: 'GET',
      url: _createForGetRequestPath(`api/v4/contacts/${currentContactRaw.id}`),
      headers: {
        ..._createAuthHeader(accessToken),
      },
    });
    const {
      data: data_contact,
    } = response_contact;

    const contact: ApiResponses.Contact = {
      id: data_contact.id,
      name: data_contact.name,
      phoneNumbers: [],
      emails: [],
    };

    contactsList.push(contact);

    const {
      custom_fields_values,
    } = data_contact;

    for (const customFieldValue_current of (custom_fields_values || [])) {
      const {
        field_code,
        values,
      } = customFieldValue_current;

      switch (field_code) {
        case ContactCustomFieldsValuesTypes.Email: {
          contact.emails = values.map(({
             value,
             enum_code,
         }) => ({
            value,
            enumType: enum_code,
          }));

          break;
        }
        case ContactCustomFieldsValuesTypes.Phone: {
          contact.phoneNumbers = values.map(({
             value,
             enum_code,
          }) => ({
            value,
            enumType: enum_code,
          }));

          break;
        }
      }
    }
  }

  return contactsList;
}
