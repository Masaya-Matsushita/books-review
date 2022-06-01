import { Card, Loader } from '@mantine/core'

export const Posts = ({ state }) => {
  if (state.loading) {
    return <Loader size='lg' className='fixed inset-0 m-auto' />
  }

  if (state.error) {
    return <div>{state.error}</div>
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
