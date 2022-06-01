import { useRouter } from 'next/router'
import { CookieContext } from 'pages/_app'
import { useContext, useEffect } from 'react'

export const useRedirect = () => {
  const cookie = useContext(CookieContext)
  const router = useRouter()
  useEffect(() => {
    if (cookie) {
      router.push('/')
    } else {
      router.push('/signin')
    }
  }, [cookie])
}
