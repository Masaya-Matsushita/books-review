import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'

export default function Signup() {
  return (
    <div className='bg-slate-100'>
      <Head title='signup page' />
      <AuthForm
        path='users'
        errorMessage='エラーが発生したため、登録に失敗しました。'
        title='新規登録'
        submitText='登録'
        linkHref='/signin'
        linkText='登録済みの方はこちら'
      />
    </div>
  )
}
