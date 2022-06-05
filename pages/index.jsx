import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Header } from 'components/Header'
import { PostList } from 'components/PostList'
import { useGetName } from 'hooks/useGetName'
import { usePreLoadState } from 'hooks/usePreLoadState'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { animateScroll as scroll } from 'react-scroll/modules'

export default function Home() {
  const router = useRouter()
  const { state, dispatch } = usePreLoadState()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const headerState = useGetName()

  const getPostList = useCallback(
    async (e) => {
      // ローディング開始
      dispatch({ type: 'start' })

      // offsetの値を定義
      const offset = 10 * (e - 1)
      if (!e) {
        offset = 0
      }
      dispatch({ type: 'offset', offset: offset })

      // postListを取得(10件分)
      try {
        const res = await fetch(
          `https://api-for-missions-and-railways.herokuapp.com/books?offset=${offset}`,
          {
            method: 'GET',
            mode: 'cors',
            headers: {
              Authorization: `Bearer ${cookies.token}`,
            },
          }
        )
        const json = await res.json()

        // エラーの入ったデータを取得した場合
        if (!res.ok) {
          dispatch({ type: 'error', error: json.ErrorMessageJP })
          return
        }

        // データをpostListへ、ローディング解除
        dispatch({ type: 'postList', postList: [...json] })

        // fetchが失敗した場合
      } catch (error) {
        dispatch({ type: 'error', error: error.message })
      }
    },
    [cookies.token, dispatch]
  )

  // ログイン済でfetch、未ログインでリダイレクト
  useEffect(() => {
    cookies.token ? getPostList() : router.push('/signin')
  }, [cookies.token, getPostList, router])

  return (
    <div className='bg-slate-100'>
      <Head title='index page' />
      <Header state={headerState} router={router} />
      <h1>投稿一覧</h1>
      <PostList state={state} router={router} />
      <Pagination
        onChange={(e) => getPostList(e)}
        total={10}
        spacing='4px'
        className='flex justify-center mt-4'
      />
    </div>
  )
}
