'use client'
import { createContext } from 'react';
import { User } from '@prisma/client';

export type AuthContextType = {
  user: User | undefined
} | undefined

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export const AuthContext = createContext<AuthContextType>()

