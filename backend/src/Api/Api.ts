'use strict';

import axios, {AxiosError} from 'axios';

import {getTokensFromFile as _getTokensFromFile, setTokensToFile as _setTokensToFile, Tokens} from '../utils/utils';
import {client_id, client_secret} from "../../utils/constants";
import {AmoCRMResponses, ApiResponses} from "./types/Api";
import {assertIsValidTokens} from "../typeguards/typeguards";

const enum ERROR_AMOCRM_CODES {
  /** Когда токены протухают - получаем такой код */
  Unauthorized = 401,
}

const pathToAmoCRM = "https://araikrasoian.amocrm.ru";

class _TokensApi {
  private _tokens: Tokens;

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
}

export class Api {
  private _tokensApi = new _TokensApi();

  public async getLeads(): Promise<ApiResponses.GetLeadsDataReturn> {
    const {
      _tokensApi,
    } = this;
    const {
      refresh,
    } = _tokensApi.getTokensFromFile();

    const _getLeads = async (): Promise<ApiResponses.GetLeadsDataReturn> => {
      const {
        access,
      } = _tokensApi.getTokensFromFile();

      const response = await axios<AmoCRMResponses.GetLeadsData>({
        method: 'GET',
        url: `${pathToAmoCRM}/api/v4/leads`,
        headers: {
          "Authorization": `Bearer ${access}`,
        },
      });

      return response.data._embedded.leads.map(({
        created_at,
        id,
        name,
        price,
        group_id,
        responsible_user_id,
        status_id,
      }) => ({
        created_at,
        id,
        name,
        price,
        group_id,
        responsible_user_id,
        status_id,
      }));
    }

    try {
      return await _getLeads();
    }
    catch (error: unknown) {
      if ((error as AxiosError).response.status === ERROR_AMOCRM_CODES.Unauthorized) {
        await this.updateTokens(refresh);

        return _getLeads();
      }

      throw error;
    }
  }

  public async getContacts() {
  }

  private async updateTokens(refreshToken: string) {
    const response = await axios<AmoCRMResponses.TokensResponseData>({
      method: 'POST',
      url: `${pathToAmoCRM}/oauth2/access_token`,
      data: {
        "client_id": client_id,
        "client_secret": client_secret,
        "refresh_token": refreshToken,
        "grant_type": "refresh_token",
        "redirect_uri": "https://localhost.com",
    }});

    const {
      data: {
        access_token,
        refresh_token,
      },
    } = response;

    this._tokensApi.setTokensToFile({
      access: access_token,
      refresh: refresh_token,
    });
  }
}
