'use strict';

import { Injectable } from '@nestjs/common';

import { Api } from '../Api/Api';

@Injectable()
export class LeadsService {
  private _api = new Api();

  getLeads(query?: string) {
    return this._api.getLeads(query);
  }
}
