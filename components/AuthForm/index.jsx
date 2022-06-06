import { Box, Button, Group, PasswordInput, TextInput } from '@mantine/core'
import { At, Ballpen, Book2, Check, Key } from 'tabler-icons-react'
import Link from 'next/link'
import { useLoadState } from 'hooks/useLoadState'
import { useAuthFormInitialize } from 'hooks/useAuthFormInitialize'
import { useCookies } from 'react-cookie'
import { showNotification } from '@mantine/notifications'
import { ErrorMessage } from 'components/ErrorMessage'
// import PropTypes from 'prop-types'

export const AuthForm = (props) => {
  const form = useAuthFormInitialize(props.path)
  const { state, dispatch } = useLoadState()
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  const handleSubmit = async (values) => {
    //ローディング表示
    dispatch({ type: 'start' })

    //トークンを取得
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/${props.path}`,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      )
      const json = await res.json()

      // エラーの入ったデータを取得した場合
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      // ローディング表示を解除
      dispatch({ type: 'end' })

      // クッキーに値をセット
      setCookie('token', json.token, { maxAge: 7200 })

      // topベージへ遷移
      props.router.push('/')
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: 'ログインに成功しました',
        icon: <Check />,
        color: 'teal',
      })

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  return (
    <div>
      <Box sx={{ maxWidth: 500 }} mx='auto'>
        <h1>{props.title}</h1>
        <ErrorMessage state={state} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {/* サインイン画面ではName入力無し */}
          {props.path === 'users' ? (
            <TextInput
              id='username'
              placeholder='レビュー太郎'
              label='User Name'
              aria-label='User name'
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
            aria-label='Password'
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
        <Link href={props.linkHref}>
          <a className='block mt-4'>{props.linkText}</a>
        </Link>
      </Box>
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
