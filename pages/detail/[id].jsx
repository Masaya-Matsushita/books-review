import { useDetailState } from 'hooks/useDetailState'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function DetailId() {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
  const { state, dispatch } = useDetailState()

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
      // console.log(json)
      dispatch({ type: 'end', data: json })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }, [cookies.token, router.query.id, dispatch])

  useEffect(() => {
    router.query.id ? getDetail() : null
  }, [router.query.id, getDetail])

  return <div>{state.data ? state.data.id : null}</div>
}
