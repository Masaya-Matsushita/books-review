import { usePreLoadState } from 'hooks/usePreLoadState'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useGetDetail = () => {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = usePreLoadState()

  const getDetail = useCallback(async () => {
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

      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      dispatch({ type: 'detail', detail: json })
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }, [cookies.token, router.query.id, dispatch])

  useEffect(() => {
    router.query.id ? getDetail() : null
  }, [router.query.id, getDetail])

  return state
}
