import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirectToTop } from 'hooks/useRedilectToTop'
import { useCookies } from 'react-cookie'

export default function Signup() {
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  // ログインしている場合トップページへリダイレクト
  useRedirectToTop(cookies.token)

  return (
    <div className='bg-slate-100'>
      <Head title='signup page' />
      <AuthForm
        path='users'
        title='新規登録'
        submitText='登録'
        linkHref='/signin'
        linkText='登録済みの方はこちら'
      />
    </div>
  )
}
