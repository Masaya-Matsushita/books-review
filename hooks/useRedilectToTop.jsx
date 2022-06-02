import { showNotification } from '@mantine/notifications'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Check } from 'tabler-icons-react'
// import { CookieContext } from 'components/StateProvider'
import { useCookies } from 'react-cookie'

export const useRedirectToTop = () => {
  // const cookie = useContext(CookieContext)
  const router = useRouter()
  const [cookies, setCookie, reduceCookie] = useCookies('token')

  useEffect(() => {
    if (cookies.token) {
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
  }, [])
}
