import { useRouter } from 'next/router'
import { CookieContext } from 'pages/_app'
import { useContext, useEffect } from 'react'

export const useRedirectToSignin = () => {
  const cookie = useContext(CookieContext)
  const router = useRouter()

  useEffect(() => {
    if (!cookie) {
      router.push('/signin')
      // console.log('hello')
    }
  }, [])
}
