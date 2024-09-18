import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { TmaGuard } from './tma.guard';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from '@my-clicker/prisma-client';
import { jwtConstants } from '@my-clicker/prisma-auth';

@Module({
  imports: [
    // PassportModule.register({
    //   global: true,
    //   defaultStrategy: 'jwt',
    // }),
    // JwtModule.registerAsync({
    //   global: true,
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: getJwtConfig
    // }),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1h" },
    }),
    // ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    { provide: 'TMA_GUARD', useClass: TmaGuard },
  ],
})
export class AppModule {}
