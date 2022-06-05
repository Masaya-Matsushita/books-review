import { usePreLoadState } from 'hooks/usePreLoadState'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useGetName = () => {
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  const { state, dispatch } = usePreLoadState()

  const getName = useCallback(async () => {
    // ユーザー名を取得
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

      // エラーの入ったデータを取得した場合
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      // nameを取得、ローディング解除
      dispatch({ type: 'name', name: json.name })

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }, [cookies.token, dispatch])

  // cookies.token定義時
  useEffect(() => {
    cookies.token ? getName() : null
  }, [cookies.token, getName])

  return state
}
