import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'

export const useRedirectToSignin = () => {
  const router = useRouter()
  const [cookies, setCookie, reduceCookie] = useCookies('token')

  useEffect(() => {
    if (!cookies.token) {
      router.push('/signin')
    }
  }, [])
}
