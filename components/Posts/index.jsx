import { Button, Card, Loader } from '@mantine/core'
import { useRouter } from 'next/router'
import { Plus } from 'tabler-icons-react'

export const Posts = ({ state }) => {
  const router = useRouter()

  // ローディング状態
  if (state.loading) {
    return <Loader size='xl' className='block mx-auto mt-12' />
  }

  // エラー発生時
  if (state.error) {
    return <div className='mt-12 text-xl text-center'>{state.error}</div>
  }

  // 取得した投稿が空だった場合
  if (state.posts.length === 0) {
    return <div className='mt-12 text-xl text-center'>投稿はありません</div>
  }

  return (
    <div>
      {state.posts.map((post) => {
        return (
          <Card key={post.id} className='mb-8'>
            <h1>{post.title}</h1>
            <h3>{post.detail}</h3>
            <p>{post.review}</p>
            <a href={post.url} className='block mr-4 text-right'>
              作品のリンク
            </a>
            <p className='mr-4 mb-0 text-right'>Reviewed by {post.reviewer}</p>
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
