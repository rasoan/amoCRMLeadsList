'use strict';

import { Module } from '@nestjs/common';

import { LeadsController } from './Leads/leads.controller';
import { LeadsService } from './Leads/leads.service';

@Module({
  imports: [AppModule],
  controllers: [LeadsController],
  providers: [LeadsService],
})
export class AppModule {}
