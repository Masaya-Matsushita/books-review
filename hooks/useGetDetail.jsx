import { usePreLoadState } from 'hooks/usePreLoadState'
import { useCallback, useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { PropTypes } from 'prop-types'

export const useGetDetail = (bookId) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = usePreLoadState()

  const getDetail = useCallback(async () => {
    // Detailを取得
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books/${bookId}`,
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )
      const json = await res.json()

      // エラーの入ったデータを取得した場合
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      // データをdetailへ、ローディング解除
      dispatch({ type: 'detail', detail: json })

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }, [cookies.token, bookId, dispatch])

  // bookId定義時
  useEffect(() => {
    bookId ? getDetail() : null
  }, [bookId, getDetail])

  return state
}

useGetDetail.propTypes = {
  bookId: PropTypes.string,
}
