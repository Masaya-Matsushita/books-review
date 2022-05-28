import { AuthForm } from 'components/AuthForm'
import Head from 'next/head'

export default function Signup() {
  return (
    <div>
      <Head>
        <title>Signup Page</title>
      </Head>
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
