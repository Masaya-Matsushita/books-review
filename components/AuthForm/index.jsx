import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { At, Ballpen, Book2, Key } from 'tabler-icons-react'
import Link from 'next/link'
import { useAuthState } from 'hooks/useAuthState'
import { useAuthFormInitialize } from 'hooks/useAuthFormInitialize'
import { isLoginContext } from 'pages/_app'
import { useContext } from 'react'
// import PropTypes from 'prop-types'

export const AuthForm = (props) => {
  const form = useAuthFormInitialize(props.path)
  const { state, dispatch } = useAuthState()
  const { setIsLogin } = useContext(isLoginContext)

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
      const json = await res.json()
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      //ローディング表示を解除
      dispatch({ type: 'end' })

      //クッキーに値をセット
      document.cookie = `token=${json.token}; max-age=7200`
      setIsLogin(true)

      //エラー処理
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  return (
    <div>
      <h1>{props.title}</h1>
      {state.error ? (
        <div className='text-lg font-bold text-red-500'>
          Error：{state.error}
        </div>
      ) : null}
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* サインイン画面ではName入力無し */}
          {props.path === 'users' ? (
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
          <Group position='right'>
            <Button
              type='submit'
              size='lg'
              leftIcon={<Book2 size={16} />}
              loading={state.loading}
              className='mt-8'
            >
              {props.submitText}
            </Button>
          </Group>
        </form>
      </Box>
      <Link href={props.linkHref}>
        <a className='block mt-4'>{props.linkText}</a>
      </Link>
    </div>
  )
}

// AuthForm.Proptypes = {
//   path: PropTypes.oneOf(['users', 'signin']),
//   title: PropTypes.oneOf(['新規登録', 'ログイン']),
//   submitText: PropTypes.oneOf(['登録', 'ログイン']),
//   linkHref: PropTypes.oneOf(['/signin', '/signup']),
//   linkText: PropTypes.oneOf([
//     '登録済みの方はこちら',
//     'アカウントをお持ちでない方',
//   ]),
// }
