'use strict';

import { Injectable } from '@nestjs/common';

import {Api, ERROR_AMOCRM_CODES} from '../Api/Api';
import {AxiosError} from "axios";
import { FakeApi } from "../../test/FakeApi/FakeApi";

@Injectable()
export class LeadsService {
  public api: Api;

  /**
   * @see https://github.com/Microsoft/TypeScript/issues/3841#issuecomment-337560146
   */
  declare ['constructor']: typeof LeadsService;

  constructor() {
    this.api = this.constructor._getApi();
  }

  @authDecorator()
  public async getLeads(query?: string) {
    const {
      api,
    } = this;
    const {
      refresh,
    } = api.getTokensFromFile();

    try {
      return await api.getLeads({ query });
    }
    catch (error: unknown) {
      if ((error as AxiosError)?.response?.status === ERROR_AMOCRM_CODES.Unauthorized) {
        await api.updateTokens(refresh);

        return api.getLeads({ query });
      }

      throw error;
    }
  }

  protected static _getApi(): Api {
    // return new Api();
    return new FakeApi();
  }
}

function authDecorator() {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const fn = descriptor.value;

    descriptor.value = async function(...args) {
      const leadService = this as LeadsService;

      try {
        return await fn.apply(leadService, args);
      }
      catch (error: unknown) {
        const { api } = leadService;
        const [ query ] = args;
        const { refresh } = api.getTokensFromFile();

        if ((error as AxiosError)?.response?.status === ERROR_AMOCRM_CODES.Unauthorized) {
          await api.updateTokens(refresh);

          return api.getLeads({ query });
        }

        throw error;
      }
    };
  };
}
