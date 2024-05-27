'use strict';

import {Controller, Get, Query} from '@nestjs/common';

import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('list')
  getLeads(@Query('query') query?: string) {
    return this.leadsService.getLeads(query);
  }
}
