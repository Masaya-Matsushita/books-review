import { useReducer } from 'react'

// 状態の初期設定
const initialState = {
  name: null,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    // ローディング終了
    case 'name':
      return {
        ...state,
        name: action.name,
      }
    // エラー
    case 'error':
      return {
        ...state,
        error: action.error,
      }
    default: {
      throw new Error('no such action type!')
    }
  }
}

export const useNameState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
