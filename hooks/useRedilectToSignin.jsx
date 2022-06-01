import { useRouter } from 'next/router'
import { useEffect } from 'react'

export const useRedirectToSignin = (cookie) => {
  const router = useRouter()

  useEffect(() => {
    if (!cookie) {
      router.push('/signin')
    }
  }, [cookie, router])
}
