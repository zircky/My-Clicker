import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { parse, validate } from '@telegram-apps/init-data-node';
import { PrismaService } from '@my-clicker/prisma-client';
import { Prisma, User } from '@prisma/client';
import { returnUserObject } from './return-user.object';

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

      if (!parsedData.user) {
        throw new Error('User data is required');
      }

      const username = parsedData.user.username;
      if (!username) {
        throw new Error('Username is required');
      }

      const user = await this.findOrCreateUser(parsedData.user.id, parsedData.user.username)

      const payload = { id: user.id }

      return {
        user,
        token: await this.jwtService.signAsync(payload)
      }
    } catch (e) {
      throw new UnauthorizedException()
    }
  }

  async findOrCreateUser(telegramId: number, username: string | undefined) {
    if (!username) {
      throw new Error('Username is required');
    }

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

  async getUserById(id: number, selectObject: Prisma.UserSelect = {}) {
    if (!id) {
      throw new Error('ID is required');
    }
    const user = await this.prisma.user.findUnique({
      where: {
        id
      },

      select: {
        // ...returnUserObject,
        ...selectObject
      }
    });

    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByTelegramId(telegramId: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { telegramId },
    });
  }
}
