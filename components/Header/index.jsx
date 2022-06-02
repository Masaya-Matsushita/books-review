import { Button } from '@mantine/core'
import { useNameState } from 'hooks/useNameState'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
// import { CookieContext } from 'components/StateProvider'
import { useCookies } from 'react-cookie'
import Link from 'next/link'

export const Header = () => {
  const router = useRouter()
  // const cookie = useContext(CookieContext)
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  const { state, dispatch } = useNameState()

  // ユーザー名を取得
  const getName = async () => {
    try {
      const token = cookies.token
      const res = await fetch(
        'https://api-for-missions-and-railways.herokuapp.com/users',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${token}`,
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
    getName()
  }, [])

  return (
    <div className='flex justify-end'>
      {state.name ? (
        <div>
          ログイン済：
          <Link href='/profile'>
            <a>{state.name}</a>
          </Link>
          さん
        </div>
      ) : (
        <Button onClick={() => router.push('/signin')}>ログイン</Button>
      )}
    </div>
  )
}
