import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirectToTop } from 'hooks/useRedilectToTop'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

export default function Signin() {
  const router = useRouter()
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  // ログインしている場合トップページへリダイレクト
  useRedirectToTop(cookies.token, router)

  return (
    <>
      <Head title='signin page' />
      <AuthForm
        router={router}
        path='signin'
        title='ログイン'
        submitText='ログイン'
        linkHref='/signup'
        linkText='アカウントをお持ちでない方'
      />
    </>
  )
}
