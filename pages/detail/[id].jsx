import { Button, Card, Loader } from '@mantine/core'
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

  return (
    <div className='bg-slate-100'>
      {state.data ? (
        <div>
          <Card>
            <h1>{state.data.title}</h1>
            <h3>{state.data.detail}</h3>
            <p>{state.data.review}</p>
            <a href={state.data.url} className='block mr-4 text-right'>
              作品のリンク
            </a>
            <p className='mr-4 mb-0 text-right'>
              Reviewed by {state.data.reviewer}
            </p>
          </Card>
          <Button
            size='lg'
            className='block mt-4 mr-4 ml-auto'
            onClick={() => router.push('/')}
          >
            一覧へ戻る
          </Button>
        </div>
      ) : null}
    </div>
  )
}
