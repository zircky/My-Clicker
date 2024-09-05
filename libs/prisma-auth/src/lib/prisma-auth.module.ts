import { Module } from '@nestjs/common';
import { PrismaAuthService } from './prisma-auth.service';

@Module({
  controllers: [],
  providers: [PrismaAuthService],
  exports: [PrismaAuthService],
})
export class PrismaAuthModule {}
