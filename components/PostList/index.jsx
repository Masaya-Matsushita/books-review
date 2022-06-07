import { Button, Card, Loader, Menu, Modal } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Ballpen, Check, Plus, Trash } from 'tabler-icons-react'

export const PostList = ({ state, dispatch, router }) => {
  const [cookies, setCookie, removeCookie] = useCookies()
  const [opened, setOpened] = useState(null)

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

      // 画面下に完了通知
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: 'レビューを削除しました',
        icon: <Check />,
        color: 'teal',
      })

      // 削除後にページをリダイレクト
      setOpened(null)
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
            {/* 自分の投稿はMenuを表示 */}
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
                  onClick={() => setOpened(post.id)}
                >
                  Delete
                </Menu.Item>
              </Menu>
            ) : null}
            <div
              onClick={() => router.push(`/detail/${post.id}`)}
              className='cursor-pointer'
            >
              <h1>
                {post.title.length > 40
                  ? post.title.slice(0, 40) + '...'
                  : post.title}
              </h1>
              <div>
                {post.detail.length > 50
                  ? post.detail.slice(0, 50) + '...'
                  : post.detail}
              </div>
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
      <Modal
        opened={opened}
        onClose={() => setOpened(null)}
        withCloseButton={false}
        className='mt-16 text-center'
      >
        <div className='mt-4'>投稿を削除してもよろしいですか？</div>
        <Button
          variant='outline'
          onClick={() => setOpened(null)}
          className='mx-4 mt-6'
        >
          キャンセル
        </Button>
        <Button
          color='red'
          variant='outline'
          onClick={() => deletePost(opened)}
          className='mx-4 mt-6'
        >
          削除
        </Button>
      </Modal>
      <Button
        className='sticky bottom-16 left-full -mt-16 w-16 h-16 rounded-full'
        compact
        onClick={() => router.push('/new')}
      >
        <Plus size={48} />
      </Button>
    </div>
  )
}
