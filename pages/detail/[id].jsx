import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function DetailId() {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()

  const getDetail = useCallback(async () => {
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
    console.log(json)
  }, [cookies.token, router.query.id])

  useEffect(() => {
    getDetail()
  }, [getDetail])

  return <div>{router.query.id}</div>
}
