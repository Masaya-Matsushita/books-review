import { Card } from '@mantine/core'

export const Posts = ({ cookie, state }) => {
  if (!cookie) {
    return <div>ログインしてください</div>
  }

  if (state.loading) {
    return <div>ローディング中</div>
  }

  if (state.error) {
    return <div>エラーが発生したため、データの取得に失敗しました。</div>
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
    </div>
  )
}
