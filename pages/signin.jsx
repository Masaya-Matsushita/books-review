import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirectToTop } from 'hooks/useRedilectToTop'

export default function Signin() {
  // ログインしている場合トップページへリダイレクト
  useRedirectToTop()

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
