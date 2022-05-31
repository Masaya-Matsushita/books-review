import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Header } from 'components/Header'
import { Posts } from 'components/Posts'
import { usePostsState } from 'hooks/usePostsState'
import { CookieContext } from 'pages/_app'
import { useContext, useEffect } from 'react'

export default function Home() {
  const cookie = useContext(CookieContext)
  const { state, dispatch } = usePostsState()

  const getPosts = async (jwt, e) => {
    // postsリセット、ローディング表示
    dispatch({ type: 'start' })

    // Paginationの番号を取得し、offsetを更新
    // →1回目のonchangeではoffsetが以前の状態のままfetchされてしまう
    if (e) {
      dispatch({ type: 'offset', offset: 10 * (e - 1) })
    }

    // postsを取得(offsetの値から10件)
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books?offset=${state.offset}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      if (!res.ok) {
        throw new Error()
      }
      const json = await res.json()

      // ローディング解除、posts表示
      dispatch({ type: 'end', posts: [...json] })

      // エラー処理
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  // マウント&クッキー取得時
  useEffect(() => {
    cookie ? getPosts(cookie) : null
  }, [cookie])

  return (
    <div className='bg-slate-100'>
      <Head title='index page' />
      <Header />
      <h1>投稿一覧</h1>
      <Posts cookie={cookie} state={state} />
      <Pagination
        onChange={cookie ? (e) => getPosts(cookie, e) : null}
        total={8}
        spacing='4px'
        className='flex justify-center pb-12 mt-12 w-full'
      />
    </div>
  )
}
