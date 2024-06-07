'use strict';

import { Injectable } from '@nestjs/common';

import {Api, ERROR_AMOCRM_CODES} from '../Api/Api';
import {AxiosError} from "axios/index";
import { FakeApi } from "../../test/FakeApi/FakeApi";

@Injectable()
export class LeadsService {
  private _api: Api;

  /**
   * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
   */
  declare ['constructor']: typeof LeadsService;

  constructor() {
    this._api = this.constructor._getApi();
  }

  public async getLeads(query?: string) {
    const {
      _api,
    } = this;
    const {
      refresh,
    } = _api.getTokensFromFile();

    // todo: try catch вынести в декоратор
    try {
      return await _api.getLeads({ query });
    }
    catch (error: unknown) {
      if ((error as AxiosError)?.response?.status === ERROR_AMOCRM_CODES.Unauthorized) {
        await _api.updateTokens(refresh);

        return _api.getLeads({ query });
      }

      throw error;
    }
  }

  protected static _getApi(): Api {
    // return new Api();
    return new FakeApi();
  }
}
