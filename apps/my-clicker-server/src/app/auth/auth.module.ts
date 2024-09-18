import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { jwtConstants, PrismaAuthService } from '@my-clicker/prisma-auth';
import { PrismaService } from '@my-clicker/prisma-client';
import { JwtModule, JwtService } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [PrismaAuthService, PrismaService],
})
export class AuthModule {}
