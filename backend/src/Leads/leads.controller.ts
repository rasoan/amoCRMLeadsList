'use strict';

import { Controller, Get } from '@nestjs/common';

import { LeadsService } from './leads.service';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @Get('list')
  getLeads() {
    return this.leadsService.getLeads();
  }
}
