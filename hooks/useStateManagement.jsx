import { useReducer } from 'react'

const initialState = {
  loading: false,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        loading: true,
      }
    case 'end':
      return {
        ...state,
        loading: false,
      }
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

export const useStateManagement = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return { state, dispatch }
}
