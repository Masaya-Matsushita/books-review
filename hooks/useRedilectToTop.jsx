import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Check } from 'tabler-icons-react'

export const useRedirectToTop = (token) => {
  const router = useRouter()

  useEffect(() => {
    if (token) {
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
  }, [router, token])
}
