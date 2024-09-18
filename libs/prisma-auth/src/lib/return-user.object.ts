import { Prisma } from "@prisma/client";

export const returnUserObject: Prisma.UserSelect = {
  id: true,
  telegramId: false,
  username: false
}
