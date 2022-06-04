import { Badge, Button, Card, Loader } from '@mantine/core'
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
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      dispatch({ type: 'end', data: json })
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }, [cookies.token, router.query.id, dispatch])

  useEffect(() => {
    router.query.id ? getDetail() : null
  }, [router.query.id, getDetail])

  return (
    <div className='bg-slate-100'>
      {state.loading ? (
        <Loader size='xl' className='fixed inset-0 m-auto' />
      ) : null}
      {state.error ? (
        <div className='text-lg font-bold text-red-500'>
          Error：{state.error}
        </div>
      ) : null}
      {state.data ? (
        <div>
          <Card>
            <h1 className='inline-block pr-1'>{state.data.title}</h1>
            {state.data.isMine ? <Badge>My Review</Badge> : null}
            <h3>{state.data.detail}</h3>
            <p>{state.data.review}</p>
            <div className='pr-4 text-right'>
              <a href={state.data.url}>作品のリンク</a>
            </div>
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
