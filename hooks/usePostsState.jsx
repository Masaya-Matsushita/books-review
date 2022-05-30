import { useReducer } from 'react'

// 状態の初期設定
const initialState = {
  posts: [],
  offset: 0,
  loading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    // 開始
    case 'start':
      return {
        ...state,
        posts: [],
        loading: true,
      }
    // 取得するpostsの範囲をセット
    case 'offset':
      return {
        ...state,
        offset: action.offset,
      }
    // 終了
    case 'end':
      return {
        ...state,
        posts: action.posts,
        loading: false,
      }
    // エラー
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default: {
      throw new Error('no such action type!')
    }
  }
}

export const usePostsState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
