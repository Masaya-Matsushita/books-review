import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import Head from 'next/head'
import { At, Ballpen, Book2, Key } from 'tabler-icons-react'
import { z } from 'zod'
import Link from 'next/link'
import { useReducer } from 'react'

const schema = z.object({
  name: z
    .string()
    .min(2, { message: '2文字以上10文字以内で入力してください。' })
    .max(10, { message: '2文字以上10文字以内で入力してください。' }),
  email: z.string().email({ message: '正しく入力されていません。' }),
  password: z.string().regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i, {
    message: '「半角英数それぞれ1種類以上を含む6文字以上」で入力してください。',
  }),
})

const initialState = {
  loading: false,
  data: '',
  error: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return {
        ...state,
        loading: true,
      }
    case 'end':
      return {
        ...state,
        loading: false,
        data: action.data,
      }
    case 'error':
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    default: {
      throw new Error('no such action type')
    }
  }
}

export default function Signup() {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async (values) => {
    dispatch({ type: 'start' })
    try {
      const res = await fetch(
        'https://api-for-missions-and-railways.herokuapp.com/users',
        {
          method: 'post',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )
      if (!res.ok) {
        throw new Error('エラーが発生したため、登録に失敗しました。')
      }
      const json = await res.json()
      dispatch({ type: 'end', data: json.token })
    } catch (error) {
      dispatch({ type: 'error', error })
    }
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
            placeholder='サービス太郎'
            label='User Name'
            aria-label='Full name'
            size='lg'
            required
            icon={<Ballpen size={16} />}
            {...form.getInputProps('name')}
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
            className='mt-2'
          />
          <PasswordInput
            id='password'
            placeholder='半角英数6文字以上'
            label='Password'
            size='lg'
            required
            icon={<Key size={16} />}
            {...form.getInputProps('password')}
            className='mt-2'
          />
          <Group position='right' mt='xl'>
            <Button type='submit' size='lg' leftIcon={<Book2 size={16} />}>
              登録
            </Button>
          </Group>
        </form>
      </Box>
      <Link href='/login'>
        <a>ログインはこちら</a>
      </Link>
      {state.loading ? <div>ローディング中</div> : null}
      {state.error ? <div>{state.error.message}</div> : null}
      <div>{state.data}</div>
    </div>
  )
}
