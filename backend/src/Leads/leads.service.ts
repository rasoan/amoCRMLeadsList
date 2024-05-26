'use strict';

import { Injectable } from '@nestjs/common';

import { Api } from '../Api/Api';

@Injectable()
export class LeadsService {
  private _api = new Api();

  getLeads() {
    return this._api.getLeads();
  }
}
