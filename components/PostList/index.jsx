import { Button, Card, Loader } from '@mantine/core'
import { Plus } from 'tabler-icons-react'

export const PostList = ({ state, router }) => {
  const toDetail = (post) => {
    // isMineの有無で動的に遷移先を決定
    if (post.isMine) {
      router.push(`/edit/${post.id}`)
    } else {
      router.push(`/detail/${post.id}`)
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
          <Card key={post.id} className='mb-8' onClick={() => toDetail(post)}>
            <h1>{post.title}</h1>
            <h3>{post.detail}</h3>
            <p className='mr-4 mb-0 text-right'>
              Reviewed by{' '}
              <span
                className={
                  post.isMine ? 'text-blue-500 text-xl font-bold' : 'text-black'
                }
              >
                {post.reviewer}
              </span>
            </p>
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
