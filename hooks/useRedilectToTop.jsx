import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import { Check } from 'tabler-icons-react'
import { CookieContext } from 'components/StateProvider'

export const useRedirectToTop = () => {
  const cookie = useContext(CookieContext)
  const router = useRouter()

  useEffect(() => {
    if (cookie) {
      router.push('/')
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 5000,
        title: 'ログイン成功',
        message: 'トップページへ遷移しました',
        icon: <Check />,
        color: 'teal',
      })
    }
  }, [cookie])
}
