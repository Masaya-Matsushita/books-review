import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import Head from 'next/head'
import { At, Ballpen, Key } from 'tabler-icons-react'

export default function Home() {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      email: (value) =>
        /[\w\-._]+@[\w\-._]+\.[A-Za-z]+/.test(value)
          ? null
          : '誤った値が入力されました。',
      password: (value) =>
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i.test(value)
          ? null
          : '「半角英数字をそれぞれ1種類以上含む6文字以上」でご設定ください。',
    },
  })

  return (
    <div>
      <Head>
        <title>Signup Page</title>
      </Head>
      <h1>メールアドレスだけで簡単に登録できます</h1>
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            id='username'
            placeholder='サービス名太郎'
            label='User Name'
            aria-label='Full name'
            size='lg'
            required
            icon={<Ballpen size={16} />}
            {...form.getInputProps('name')}
            // error='error message'
            // rightSection={<Loader size='xs' />}
          />
          <TextInput
            id='email'
            placeholder='example@mail.com'
            label='Email'
            aria-label='Email'
            size='lg'
            required
            icon={<At size={16} />}
            {...form.getInputProps('email')}
            // error='error message'
            // rightSection={<Loader size='xs' />}
          />
          <PasswordInput
            id='password'
            placeholder='半角英数6文字以上'
            label='Password'
            size='lg'
            required
            icon={<Key size={16} />}
            {...form.getInputProps('password')}
            // error='error message'
          />
          <Group position='right' mt='md'>
            <Button type='submit' size='lg' uppercase>
              登録する
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}
