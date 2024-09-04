import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [PrismaClientModule],
  exports: [PrismaClientModule],
})
export class PrismaClientModule {}
