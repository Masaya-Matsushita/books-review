import { Button, Card, Loader, Menu } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useCookies } from 'react-cookie'
import { Ballpen, Check, Plus, Trash } from 'tabler-icons-react'

export const PostList = ({ state, dispatch, router }) => {
  const [cookies, setCookie, removeCookie] = useCookies()

  // 投稿を削除
  const deletePost = async (id) => {
    try {
      await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books/${id}`,
        {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      //　もしエラー情報のレスポンスが帰ってきた場合、受け取りたい
      // if (!res.ok) {
      //   const json = await res.json()
      //   dispatch({ type: 'error', error: json.ErrorMessageJP })
      //   return
      // }

      // 画面下に完了通知
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: 'レビューを削除しました',
        icon: <Check />,
        color: 'teal',
      })

      // 削除後のPostListをリダイレクト
      router.push('/')

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  // ローディング状態
  if (state.loading) {
    return <Loader size='xl' className='block mx-auto mt-12' />
  }

  // エラー発生時
  if (state.error) {
    return <div className='mt-12 text-xl text-center'>{state.error}</div>
  }

  // 取得した投稿が空だった場合
  if (state.postList.length === 0) {
    return <h2 className='my-12 text-center'>投稿はありません</h2>
  }

  return (
    <div>
      {state.postList.map((post) => {
        return (
          <Card key={post.id} className='mb-8'>
            {/* 自分の投稿はMenu表示 */}
            {post.isMine ? (
              <Menu
                control={<div className='text-3xl'>...</div>}
                className='flex justify-end mr-6 cursor-pointer'
              >
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item icon={<Ballpen size={14} />}>
                  <Link href={`/edit/${post.id}`}>
                    <a className='text-black no-underline'>Edit</a>
                  </Link>
                </Menu.Item>
                <Menu.Item
                  icon={<Trash size={14} />}
                  color='red'
                  onClick={() => deletePost(post.id)}
                >
                  Delete
                </Menu.Item>
              </Menu>
            ) : null}
            <div
              onClick={() => router.push(`/detail/${post.id}`)}
              className='cursor-pointer'
            >
              <h1>{post.title}</h1>
              <h3>{post.detail}</h3>
              <p className='mr-4 mb-0 text-right'>
                Reviewed by{' '}
                <span className='text-lg font-bold text-blue-500'>
                  {post.reviewer}
                </span>
              </p>
            </div>
          </Card>
        )
      })}
      <Button
        className='sticky bottom-16 -mt-12 w-16 h-16 rounded-full'
        compact
        onClick={() => router.push('/new')}
      >
        <Plus size={48} />
      </Button>
    </div>
  )
}
