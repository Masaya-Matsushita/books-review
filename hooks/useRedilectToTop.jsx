import { showNotification } from '@mantine/notifications'
import { useEffect } from 'react'
import { Check } from 'tabler-icons-react'
import { PropTypes } from 'prop-types'

export const useRedirectToTop = (token, router) => {
  useEffect(() => {
    if (token) {
      // ログイン完了通知
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: 'ログイン成功',
        message: 'トップページへ遷移しました',
        icon: <Check />,
        color: 'teal',
      })

      // 一覧ページへ遷移
      router.push({ pathname: '/', query: { page: 1 } })
    }
  }, [router, token])
}

useRedirectToTop.propTypes = {
  token: PropTypes.string,
}
