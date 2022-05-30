import { Pagination } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Posts } from 'components/Posts'
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
      <Posts token={token} state={state} />
      <Pagination
        onChange={token ? (e) => getPosts(token, state.offset, e) : null}
        total={10}
        className='mt-16'
      />
    </div>
  )
}
