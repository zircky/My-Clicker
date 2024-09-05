import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaAuthService } from '@my-clicker/prisma-auth';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaAuthService],
})
export class AuthModule {}
