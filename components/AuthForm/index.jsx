import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { At, Ballpen, Book2, Key } from 'tabler-icons-react'
import Link from 'next/link'
import { useAuthState } from 'hooks/useAuthState'
import { useAuthFormInitialize } from 'hooks/useAuthFormInitialize'
import { useRouter } from 'next/router'

export const AuthForm = (props) => {
  const router = useRouter()
  const form = useAuthFormInitialize()
  const { state, dispatch } = useAuthState()

  const handleSubmit = async (values) => {
    //ローディングを表示
    dispatch({ type: 'start' })

    //POST通信でトークンを取得
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/${props.path}`,
        {
          method: 'post',
          header: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )
      if (!res.ok) {
        throw new Error(props.errorMessage)
      }
      const json = await res.json()

      //ローディング表示を解除
      dispatch({ type: 'end' })

      //クッキーに値をセット
      if (typeof document !== 'undefined') {
        document.cookie = `token=${json.token}; max-age=7200`
      } else {
        throw new Error('Cookie setting error!')
      }

      //エラー処理
    } catch (error) {
      dispatch({ type: 'error', error })
    }
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* サインイン画面ではName入力無し */}
          {router.pathname === '/signup' ? (
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
          ) : null}

          {/* メールアドレス */}
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

          {/* パスワード */}
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
            {/* サインイン画面ではボタン内アイコン無し */}
            {router.pathname === '/signup' ? (
              <Button type='submit' size='lg' leftIcon={<Book2 size={16} />}>
                {props.submitText}
              </Button>
            ) : (
              <Button type='submit' size='lg'>
                {props.submitText}
              </Button>
            )}
          </Group>
        </form>
      </Box>

      {/* サインイン⇔サインアップ遷移 */}
      <Link href={props.linkHref}>
        <a className='block mt-4'>{props.linkText}</a>
      </Link>

      {/* 仮、後で消す */}
      {state.loading ? <div>ローディング中</div> : null}
      {state.error ? <div>{state.error.message}</div> : null}
    </div>
  )
}
