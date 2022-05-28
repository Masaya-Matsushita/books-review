import { AuthForm } from 'components/AuthForm'
import Head from 'next/head'

export default function Signin() {
  return (
    <div>
      <Head>
        <title>Signin Page</title>
      </Head>
      <AuthForm
        path='signin'
        errorMessage='サインインに失敗しました。入力内容をご確認ください。'
        title='サインイン'
        submitText='サインイン'
        linkHref='/signup'
        linkText='アカウントをお持ちでない方'
      />
    </div>
  )
}
