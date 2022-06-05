import { usePreLoadState } from 'hooks/usePreLoadState'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useGetDetail = () => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = usePreLoadState()

  const getDetail = useCallback(async () => {
    // Detailを取得
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books/${router.query.id}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      const json = await res.json()

      // エラーの入ったデータを取得した場合
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      // データをdetailへ、ローディング解除
      dispatch({ type: 'detail', detail: json })

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }, [cookies.token, router.query.id, dispatch])

  // router.query.id定義時
  useEffect(() => {
    router.query.id ? getDetail() : null
  }, [router.query.id, getDetail])

  return state
}
