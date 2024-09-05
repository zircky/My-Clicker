import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parse, validate } from '@telegram-apps/init-data-node';
import { PrismaService } from '@my-clicker/prisma-client';
import { User } from '@prisma/client';

@Injectable()
export class PrismaAuthService {
  constructor(private jwtService:JwtService, private prisma:PrismaService) {}

  async login(initData: string) {
    const botToken = "7208041693:AAG9wpcCaLqBULzknf9XyW5K5d_SaSi7DxQ"

    try {
      validate(initData, botToken,  {
        expiresIn: 300
      })

      const parsedData = parse(initData)

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const user = await this.finOrCreateUser(parsedData.user.id, parsedData.user.username)

      const payload = { id: user.id }

      return {
        user,
        token: await this.jwtService.signAsync(payload)
      }
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  async findOrCreateUser(telegramId: bigint, username: string) {
    let user = await this.prisma.user.findUnique({
      where: { telegramId },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          telegramId,
          username,
        },
      });
    }

    return user;
  }

  async getUserById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByTelegramId(telegramId: bigint): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { telegramId },
    });
  }
}
