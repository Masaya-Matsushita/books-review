import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirectToTop } from 'hooks/useRedilectToTop'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'

export default function Signup() {
  const router = useRouter()
  const [cookies, setCookie, reduceCookie] = useCookies('token')
  // ログインしている場合トップページへリダイレクト
  useRedirectToTop(cookies.token, router)

  return (
    <div className='bg-slate-100'>
      <Head title='signup page' />
      <AuthForm
        router={router}
        path='users'
        title='新規登録'
        submitText='登録'
        linkHref='/signin'
        linkText='登録済みの方はこちら'
      />
    </div>
  )
}
