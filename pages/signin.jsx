import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'

export default function Signin() {
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
