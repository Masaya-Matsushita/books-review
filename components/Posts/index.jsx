export const Posts = ({ token, state }) => {
  if (!token) {
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
          <div key={post.id} className='mt-5 border-2'>
            <h1>{post.title}</h1>
            <h3>{post.detail}</h3>
            <p>{post.review}</p>
            <p>{post.reviewer}</p>
            <a href={post.url}>リンクはこちら</a>
          </div>
        )
      })}
    </div>
  )
}
