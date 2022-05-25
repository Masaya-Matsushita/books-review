import { PasswordInput, TextInput } from '@mantine/core'
import Head from 'next/head'
import { At, Ballpen, Key } from 'tabler-icons-react'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Signup Page</title>
      </Head>
      <h1>メールアドレスだけで簡単に登録できます</h1>
      <TextInput
        id='name-input'
        placeholder='Your name'
        label='Full name'
        aria-label='Full name'
        size='lg'
        required
        icon={<Ballpen size={16} />}
        // error='error message'
        // rightSection={<Loader size='xs' />}
      />
      <TextInput
        id='email-input'
        placeholder='Your email'
        label='Email'
        aria-label='Email'
        size='lg'
        required
        icon={<At size={16} />}
        // error='error message'
        // rightSection={<Loader size='xs' />}
      />
      <PasswordInput
        id='password-input'
        placeholder='Password'
        label='Password'
        description='At least 6'
        size='lg'
        required
        icon={<Key size={16} />}
        // error='error message'
      />
    </div>
  )
}
