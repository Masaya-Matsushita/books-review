import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import Head from 'next/head'
// import useSWR from 'swr'
import { At, Ballpen, Book2, Key } from 'tabler-icons-react'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(2, { message: '2文字以上で入力してください。' }),
  email: z.string().email({ message: '正しく入力されていません。' }),
  password: z.string().regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i, {
    message: '「半角英数それぞれ1種類以上を含む6文字以上」で入力してください。',
  }),
})

// const fetcher = async (url, values) => {
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(values),
//   })
//   if (!res.ok) {
//     throw new Error('エラーが発生したため、登録に失敗しました。')
//   }
//   const json = await res.json()
//   return json
// }

export default function Home() {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const handleSubmit = (values) => {
    console.log(values)
    // const { data, error } = useSWR(
    //   'https://api-for-missions-and-railways.herokuapp.com/users',
    //   fetcher
    // )
    // return {
    //   token: data.token,
    //   error,
    //   isLoading: !data && !error,
    // }
  }

  return (
    <div>
      <Head>
        <title>Signup Page</title>
      </Head>
      <h1>新規登録</h1>
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
          <Group position='right' mt='xl'>
            <Button type='submit' size='lg' leftIcon={<Book2 size={16} />}>
              登録
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}
