import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Header } from 'components/Header'
import { Posts } from 'components/Posts'
import { usePostsState } from 'hooks/usePostsState'
import { useRedirectToSignin } from 'hooks/useRedilectToSignin'
import { useCallback, useEffect } from 'react'
// import { CookieContext } from 'components/StateProvider'
import { useCookies } from 'react-cookie'

export default function Home() {
  // const cookie = useContext(CookieContext)
  const { state, dispatch } = usePostsState()

  const [cookies, setCookie, removeCookie] = useCookies(['sample'])

  // ログインしていない場合ログインページへリダイレクト
  useRedirectToSignin()

  const getPosts = async (e) => {
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
  }

  // マウント時&クッキー取得時
  useEffect(() => {
    cookies.token ? getPosts() : null
  }, [])

  return (
    <div className='bg-slate-100'>
      <Head title='index page' />
      <Header />
      <h1>投稿一覧</h1>
      <Posts state={state} />
      <Pagination
        onChange={(e) => getPosts(e)}
        total={10}
        spacing='4px'
        className='flex justify-center pb-12 mt-12 w-full'
      />
    </div>
  )
}
