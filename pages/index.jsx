import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Posts } from 'components/Posts'
import { usePostsState } from 'hooks/usePostsState'
import { CookieContext } from 'pages/_app'
import { useContext, useEffect } from 'react'

export default function Home() {
  const { cookie } = useContext(CookieContext)
  const { state, dispatch } = usePostsState()

  const getPosts = async (cookie, offset, e) => {
    // postsリセット、ローディング表示
    dispatch({ type: 'start' })

    // Paginationの番号を取得し、offsetを更新
    // →1回目のonchangeではoffsetが以前の状態のままfetchされてしまう
    if (e) {
      dispatch({ type: 'offset', offset: 10 * (e - 1) })
    }
    console.log(offset)

    // postsを取得(offsetの値から10件)
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books?offset=${offset}`,
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${cookie}`,
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

  // マウント時
  useEffect(() => {
    cookie ? getPosts(cookie, state.offset) : null
  }, [cookie])

  return (
    <div>
      <Head title='index page' />
      <h1>Index Page</h1>
      <Posts cookie={cookie} state={state} />
      <Pagination
        onChange={cookie ? (e) => getPosts(cookie, state.offset, e) : null}
        total={10}
        className='mt-16'
      />
    </div>
  )
}
