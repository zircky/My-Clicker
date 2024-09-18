import { useAuth } from '../hook/useAuth';

export default function Home() {
  const auth = useAuth()

  const user = auth.user

  return (
    <>
      {
        user && (
          <div>
            <div>
              id: { user.id }
            </div>
            <div>
              telegramId: { user.telegramId }
            </div>
            <div>
              username: { user.username }
            </div>
          </div>
        )
      }
    </>
  );

}
