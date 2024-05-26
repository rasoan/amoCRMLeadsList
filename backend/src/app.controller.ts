import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/leads')
  getHello1(): { name: string; surname: string }[] {
    return [
      { name: 'Araik', surname: 'Rasayan' },
      { name: 'Araik', surname: 'Rasayan' },
    ];
  }
}
