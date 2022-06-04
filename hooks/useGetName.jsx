import { usePreLoadState } from 'hooks/usePreLoadState'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useGetName = () => {
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  const { state, dispatch } = usePreLoadState()

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
      const json = await res.json()

      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }
      
      dispatch({ type: 'name', name: json.name })

      // エラー処理
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }, [cookies.token, dispatch])

  // マウント時
  useEffect(() => {
    cookies.token ? getName() : null
  }, [cookies.token, getName])

  return state
}
