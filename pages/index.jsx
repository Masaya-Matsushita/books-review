import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { TokenContext } from 'pages/_app'
import { useContext, useEffect, useReducer } from 'react'

const initialState = {
  posts: [],
  offset: 0,
  loading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, posts: [], loading: true }
    case 'offset':
      return { ...state, offset: action.offset }
    case 'end':
      return { ...state, posts: action.posts, loading: false }
    case 'error':
      return { ...state, loading: false, error: action.error }
    default: {
      throw new Error('no such action type!')
    }
  }
}

export default function Home() {
  const { token } = useContext(TokenContext)
  const [state, dispatch] = useReducer(reducer, initialState)

  const getPosts = async (token, offset, e) => {
    // postsリセット、ローディング表示
    dispatch({ type: 'start' })

    // Paginationの番号を取得し、offsetを更新
    //  →1回目のonchangeではoffsetが以前の状態のままfetchされてしまう
    if (e) {
      dispatch({ type: 'offset', offset: 10 * (e - 1) })
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
      
      // ローディング解除、posts表示
      dispatch({ type: 'end', posts: [...json] })

      // エラー処理
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  // 2回マウントされる
  // 　→52行目map関数でエラー「two children with the same key」
  useEffect(() => {
    console.log('mount')
    token ? getPosts(token, state.offset) : null
    return () => {
      console.log('un-mount')
    }
  }, [])

  return (
    <div>
      <Head title='index page' />
      <h1>Index Page</h1>
      {token ? (
        state.loading ? (
          <div>ローディング中</div>
        ) : state.error ? (
          <div>エラーが発生したため、データの取得に失敗しました。</div>
        ) : (
          state.posts.map((post) => {
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
        )
      ) : (
        <div>ログインしてください</div>
      )}
      <Pagination
        onChange={token ? (e) => getPosts(token, state.offset, e) : null}
        total={10}
        className='mt-16'
      />
    </div>
  )
}
