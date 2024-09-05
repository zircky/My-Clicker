import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { PrismaService } from '../../../../libs/prisma-client/src/lib/prisma.service';
import { TmaGuard } from './tma.guard';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: 'TMA_GUARD', useClass: TmaGuard },
  ],
})
export class AppModule {}
