import { useState } from 'react';
import { User, userService } from '../service/user.service';

export const useFetchCurrentUser = () => {
  const [user, setUser] = useState<User | undefined>()
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const fetchCurrentUser = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await userService.getCurrentUser()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setUser(data)
    } catch (err) {
      setError(err as Error)
    } finally {
      setIsLoading(false)
    }
  }

  return { user, error, isLoading, fetchCurrentUser, setUser }
}
