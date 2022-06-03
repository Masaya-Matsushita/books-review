import { useReducer } from 'react'

// 状態の初期設定
const initialState = {
  loading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    // ローディング開始
    case 'start':
      return {
        ...state,
        loading: true,
      }
    // ローディング終了
    case 'end':
      return {
        ...state,
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

export const useLoadState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
