import { AuthForm } from 'components/AuthForm'
import { HeadComponent as Head } from 'components/Head'

export default function Signin() {
  return (
    <div>
      <Head title='signin page' />
      <AuthForm
        path='signin'
        errorMessage='ログインに失敗しました。入力内容をご確認ください。'
        title='ログイン'
        submitText='ログイン'
        linkHref='/signup'
        linkText='アカウントをお持ちでない方'
      />
    </div>
  )
}
