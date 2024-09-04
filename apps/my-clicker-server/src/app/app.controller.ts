import { Controller, Get, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaService } from '../../../../libs/prisma-client/src/lib/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly prisma: PrismaService) {

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
