import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Header } from 'components/Header'
import { Posts } from 'components/Posts'
import { useGetName } from 'hooks/useGetName'
import { usePostsState } from 'hooks/usePostsState'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'

export default function Home() {
  const router = useRouter()
  const { state, dispatch } = usePostsState()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const headerState = useGetName()

  const getPosts = useCallback(
    async (e) => {
      // postsリセット、ローディング表示
      dispatch({ type: 'start' })

      // offsetの値を定義
      const offset = 10 * (e - 1)
      if (!e) {
        offset = 0
      }
      dispatch({ type: 'offset', offset: offset })

      const token = cookies.token

      // postsを取得(10件分)
      try {
        const res = await fetch(
          `https://api-for-missions-and-railways.herokuapp.com/books?offset=${offset}`,
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

        // データをpostsへ、ローディング解除
        dispatch({ type: 'end', posts: [...json] })

        // fetchが失敗した場合
      } catch (error) {
        dispatch({ type: 'error', error: error.message })
      }
    },
    [cookies.token, dispatch]
  )

  // ログイン済でfetch、未ログインでリダイレクト
  useEffect(() => {
    cookies.token ? getPosts() : router.push('/signin')
  }, [cookies.token, getPosts, router])

  return (
    <div className='bg-slate-100'>
      <Head title='index page' />
      <Header state={headerState} />
      <h1>投稿一覧</h1>
      <Posts state={state} />
      <Pagination
        onChange={(e) => getPosts(e)}
        total={10}
        spacing='4px'
        className='flex justify-center mt-4'
      />
    </div>
  )
}
