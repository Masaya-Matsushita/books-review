import { useReducer } from 'react'

// 状態の初期設定
const initialState = {
  loading: true,
  error: null,
  postList: [],
  name: null,
  detail: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    // ローディング開始
    case 'start':
      return {
        ...state,
        loading: true,
      }
    // nameをfetch
    case 'name':
      return {
        ...state,
        name: action.name,
      }
    // postListをfetch
    case 'postList':
      return {
        ...state,
        loading: false,
        postList: action.postList,
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
