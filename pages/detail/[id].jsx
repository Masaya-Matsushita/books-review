import { Badge, Button, Card, Loader } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { usePreLoadState } from 'hooks/usePreLoadState'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function DetailId() {
  const router = useRouter()
  const [cookies, setCookie, removeCookie] = useCookies()
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

  return (
    <div className='bg-slate-100'>
      <Head title='Detail' />
      {state.loading ? (
        <Loader size='xl' className='fixed inset-0 m-auto' />
      ) : null}
      {state.error ? (
        <div className='text-lg font-bold text-red-500'>
          Error：{state.error}
        </div>
      ) : null}
      {state.detail ? (
        <div>
          <Card>
            <h1>{state.detail.title}</h1>
            <h3>{state.detail.detail}</h3>
            <p>{state.detail.review}</p>
            <div className='pr-4 text-right'>
              <a href={state.detail.url}>作品のリンク</a>
            </div>
            <p className='mr-4 mb-0 text-right'>
              Reviewed by {state.detail.reviewer}
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
