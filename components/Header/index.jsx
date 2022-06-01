import { Button } from '@mantine/core'
import { useNameState } from 'hooks/useNameState'
import { useRouter } from 'next/router'
import { useCallback, useContext, useEffect } from 'react'
import { CookieContext } from 'components/StateProvider'

export const Header = () => {
  const router = useRouter()
  const cookie = useContext(CookieContext)
  const { state, dispatch } = useNameState()

  // ユーザー名を取得
  const getName = useCallback(
    async (jwt) => {
      try {
        const res = await fetch(
          'https://api-for-missions-and-railways.herokuapp.com/users',
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${jwt}`,
            },
          }
        )
        if (!res.ok) {
          throw new Error()
        }
        const json = await res.json()
        dispatch({ type: 'name', name: json.name })

        // エラー処理
      } catch (error) {
        dispatch({ type: 'error', error })
      }
    },
    [dispatch]
  )

  // マウント＆クッキー取得時
  useEffect(() => {
    cookie ? getName(cookie) : null
  }, [cookie, getName])

  return (
    <div className='flex justify-end'>
      {state.name ? (
        <div>ログイン済：{state.name}さん</div>
      ) : (
        <Button onClick={() => router.push('/signin')}>ログイン</Button>
      )}
    </div>
  )
}
