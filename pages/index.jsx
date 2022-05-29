import { HeadComponent as Head } from 'components/Head'
import { TokenContext } from 'pages/_app'
import { useContext, useState } from 'react'

export default function Home() {
  const { token } = useContext(TokenContext)
  const [posts, setPosts] = useState([])

  const getPosts = async (token) => {
    try {
      const res = await fetch(
        'https://api-for-missions-and-railways.herokuapp.com/books?offset=0',
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
      setPosts(json)
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <div>
      <Head title='index page' />
      <h1>Index Page</h1>
      <button onClick={token ? (e) => getPosts(token, e) : null}>ボタン</button>
      {posts ? (
        <div>
          {posts.map((post) => {
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
      ) : null}
    </div>
  )
}
