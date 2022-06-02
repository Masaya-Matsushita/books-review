import { useNameState } from 'hooks/useNameState'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useGetName = () => {
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  const { state, dispatch } = useNameState()

  // ユーザー名を取得
  const getName = useCallback(async () => {
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
  }, [cookies.token, dispatch])

  // マウント時
  useEffect(() => {
    cookies.token ? getName() : null
  }, [cookies.token, getName])

  return state
}
