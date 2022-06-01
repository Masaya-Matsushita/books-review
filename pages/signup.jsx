import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'

export default function Signup() {
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
