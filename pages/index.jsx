import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Header } from 'components/Header'
import { Posts } from 'components/Posts'
import { usePostsState } from 'hooks/usePostsState'
import { useRedirectToSignin } from 'hooks/useRedilectToSignin'
import { useCallback, useContext, useEffect } from 'react'
import { CookieContext } from 'components/StateProvider'

export default function Home() {
  const cookie = useContext(CookieContext)
  const { state, dispatch } = usePostsState()

  // ログインしていない場合ログインページへリダイレクト
  useRedirectToSignin(cookie)

  const getPosts = useCallback(
    async (jwt, e) => {
      // postsリセット、ローディング表示
      dispatch({ type: 'start' })

      // offsetの値を定義
      const offset = 10 * (e - 1)
      if (!e) {
        offset = 0
      }
      dispatch({ type: 'offset', offset: offset })

      // postsを取得(10件分)
      try {
        const res = await fetch(
          `https://api-for-missions-and-railways.herokuapp.com/books?offset=${offset}`,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${jwt}`,
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
    [dispatch]
  )

  // マウント時&クッキー取得時
  useEffect(() => {
    cookie ? getPosts(cookie) : null
  }, [cookie, getPosts])

  return (
    <div className='bg-slate-100'>
      <Head title='index page' />
      <Header />
      <h1>投稿一覧</h1>
      <Posts state={state} />
      <Pagination
        onChange={cookie ? (e) => getPosts(cookie, e) : null}
        total={10}
        spacing='4px'
        className='flex justify-center pb-12 mt-12 w-full'
      />
    </div>
  )
}
