import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirectToTop } from 'hooks/useRedilectToTop'
import { useCookies } from 'react-cookie'

export default function Signin() {
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  // ログインしている場合トップページへリダイレクト
  useRedirectToTop(cookies.token)

  return (
    <div className='bg-slate-100'>
      <Head title='signin page' />
      <AuthForm
        path='signin'
        title='ログイン'
        submitText='ログイン'
        linkHref='/signup'
        linkText='アカウントをお持ちでない方'
      />
    </div>
  )
}
