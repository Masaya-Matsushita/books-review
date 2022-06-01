import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirect } from 'hooks/useRedilect'

export default function Signin() {
  // ログインしている場合トップページへリダイレクト
  useRedirect()

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
