import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'
import { useRedirect } from 'hooks/useRedilect'

export default function Signup() {
  // ログインしている場合トップページへリダイレクト
  useRedirect()

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
