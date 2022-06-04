import { useReducer } from 'react'

const initialState = {
  loading: true,
  data: null,
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'end':
      return {
        loading: false,
        data: action.data,
      }
    case 'error':
      return {
        loading: false,
        error: action.error,
      }

    default:
      break
  }
}

export const useDetailState = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return { state, dispatch }
}
