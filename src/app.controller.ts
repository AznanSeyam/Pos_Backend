import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController  {
  @Get()
  root() {
    return {
      status: 'OK',
      message: 'POS Backend is running 🚀'
    };
  }
}
