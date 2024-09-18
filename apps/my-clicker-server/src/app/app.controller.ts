import { Controller, Get, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line @nx/enforce-module-boundaries

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {

  }

  @UseGuards(AuthGuard('tma'))
  @Get()
  async showInitData(@Request() req) {
    const initData = req.initData;
    if(!initData) {
      throw new HttpException('Cant display init data as long as it was not found', HttpStatus.INTERNAL_SERVER_ERROR)
    }
    return initData
  }
}
