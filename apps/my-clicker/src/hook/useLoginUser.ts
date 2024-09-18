import { useEffect, useState } from 'react';
import { LoginResponse, userService } from '../service/user.service';

declare global {
  interface Window {
    sessionStorage: any;
  }
}

export const useLoginUser = () => {
  const [authData, setAuthData] = useState<LoginResponse | undefined>()
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const loginUser = async (initData: string) => {
    if (typeof window !== 'undefined') {
      setIsLoading(true);
      setError(null);

      try {
        const data = await userService.login(initData);
        setAuthData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }
  }

  return { authData, error, isLoading, loginUser }
}
