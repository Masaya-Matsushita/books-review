import { useReducer } from 'react'

// 状態の初期設定
const initialState = {
  loading: true,
  error: null,
  posts: [],
  offset: 0,
  name: null,
  detail: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    // 取得するpostsの範囲をセット
    case 'offset':
      return {
        ...state,
        offset: action.offset,
      }
    // nameをfetch
    case 'name':
      return {
        ...state,
        name: action.name,
      }
    // postsをfetch
    case 'posts':
      return {
        ...state,
        loading: false,
        posts: action.posts,
      }
    //detailをfetch
    case 'detail':
      return {
        ...state,
        loading: false,
        detail: action.detail,
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

export const usePreLoadState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}