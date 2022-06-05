import { Button, Card, Loader, Menu } from '@mantine/core'
import Link from 'next/link'
import { Plus, Settings, Trash } from 'tabler-icons-react'

export const PostList = ({ state, router }) => {
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
                className='flex justify-end mr-6'
              >
                <Menu.Label>Menu</Menu.Label>
                <Menu.Item icon={<Settings size={14} />}>
                  <Link href={`/edit/${post.id}`}>
                    <a className='text-black no-underline'>Edit</a>
                  </Link>
                </Menu.Item>
                <Menu.Item icon={<Trash size={14} />} color='red'>
                  Delete
                </Menu.Item>
              </Menu>
            ) : null}
            <div onClick={() => router.push(`/detail/${post.id}`)}>
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
