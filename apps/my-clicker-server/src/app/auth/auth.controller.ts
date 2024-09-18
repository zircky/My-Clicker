import {
  Body, Controller, Get, HttpCode, Post
} from '@nestjs/common';
import {PrismaAuthService, PublicRoute, CurrentUser } from '@my-clicker/prisma-auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: PrismaAuthService) {}

  @PublicRoute()
  @HttpCode(200)
  @Post("login")
  async login(@Body() body: { initData: string }) {
    return await this.authService.login(body.initData)
  }

  @Get("me")
  // @Auth()
  async getCurrentUser(@CurrentUser('id') id: number) {
    return await this.authService.getUserById(id)
  }

  @Get("telegramId")
  async getUserByTelegramId(@CurrentUser('telegramId') telegramId: number) {
    return await this.authService.findByTelegramId(telegramId)
  }

}
