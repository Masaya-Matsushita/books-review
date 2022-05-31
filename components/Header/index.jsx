import { Button } from '@mantine/core'
import { useNameState } from 'hooks/useNameState'
import Router from 'next/router'
import { CookieContext } from 'pages/_app'
import { useContext, useEffect } from 'react'

export const Header = () => {
  const cookie = useContext(CookieContext)
  const { state, dispatch } = useNameState()

  // ユーザー名を取得
  const getName = async (jwt) => {
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
  }

  // マウント＆クッキー取得時
  useEffect(() => {
    cookie ? getName(cookie) : null
  }, [cookie])

  return (
    <div className='flex justify-center'>
      {state.name ? (
        <div>ログイン済：{state.name}さん</div>
      ) : (
        <Button onClick={() => Router.push('/signin')}>ログイン</Button>
      )}
    </div>
  )
}
