import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { TokenContext } from 'pages/_app'
import { useContext, useEffect, useState } from 'react'

export default function Home() {
  const { token } = useContext(TokenContext)
  const [posts, setPosts] = useState([])
  const [offset, setOffset] = useState(0)

  const getPosts = async (token, offset, e) => {
    // postsをリセット
    setPosts([])

    // Paginationの番号を取得し、offsetを更新
    // 1回目のonchangeではoffsetが以前の状態のままfetchされてしまう
    if (e) {
      setOffset(10 * (e - 1))
    }
    console.log(offset)

    // postsを取得(offsetの値から10件)
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
      if (!res.ok) {
        throw new Error('エラー')
      }
      const json = await res.json()
      setPosts([...json])
    } catch (error) {
      console.error(error.message)
    }
  }

  // 2回マウントされる
  // 　→52行目map関数でエラー「two children with the same key」
  useEffect(() => {
    console.log('mount')
    token ? getPosts(token, offset) : null
    return () => {
      console.log('un-mount')
    }
  }, [])

  return (
    <div>
      <Head title='index page' />
      <h1>Index Page</h1>
      {token ? (
        posts.map((post) => {
          return (
            <div key={post.id} className='mt-5 border-2'>
              <h1>{post.title}</h1>
              <h3>{post.detail}</h3>
              <p>{post.review}</p>
              <p>{post.reviewer}</p>
              <a href={post.url}>リンクはこちら</a>
            </div>
          )
        })
      ) : (
        <div>ログインしてください</div>
      )}
      <Pagination
        onChange={token ? (e) => getPosts(token, offset, e) : null}
        total={10}
        className='mt-16'
      />
    </div>
  )
}
