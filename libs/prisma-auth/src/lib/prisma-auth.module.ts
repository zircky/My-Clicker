import { Module } from '@nestjs/common';
import { PrismaAuthService } from './prisma-auth.service';
import { PrismaClientModule } from '@my-clicker/prisma-client';

@Module({
  imports: [PrismaClientModule],
  providers: [PrismaAuthService],
  exports: [PrismaAuthService],
})

export class PrismaAuthModule {}
