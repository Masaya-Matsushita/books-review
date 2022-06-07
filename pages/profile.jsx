import { Box, Button, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { ErrorMessage } from 'components/ErrorMessage'
import { HeadComponent as Head } from 'components/Head'
import { useGetName } from 'hooks/useGetName'
import { useLoadState } from 'hooks/useLoadState'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Ballpen, Book2, Check } from 'tabler-icons-react'
import { z } from 'zod'

//フォームのバリデーションを定義
const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: '2文字以上15文字以内で入力してください。' })
    .max(15, { message: '2文字以上15文字以内で入力してください。' }),
})

export default function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const nameState = useGetName()
  const router = useRouter()
  const { state, dispatch } = useLoadState()

  // フォームの初期設定
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
    },
  })

  // nameStateをformの初期値に設定
  useEffect(
    nameState.name
      ? () => {
          form.setFieldValue('name', nameState.name)
        }
      : () => {},
    [nameState]
  )

  const handleSubmit = async (value) => {
    // ローディング開始
    dispatch({ type: 'start' })

    // 名前を更新
    try {
      const res = await fetch(
        'https://api-for-missions-and-railways.herokuapp.com/users',
        {
          method: 'PUT',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.token}`,
          },
          body: JSON.stringify(value),
        }
      )

      const json = await res.json()

      // エラーの入ったデータを取得した場合
      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      // ローディング解除
      dispatch({ type: 'end' })

      // 画面下に完了通知
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: `ようこそ！${value.name}さん`,
        message: 'ユーザーネームを変更しました',
        icon: <Check />,
        color: 'teal',
      })

      //　一覧ページへ遷移
      router.push('/')

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  return (
    <>
      <Head title='profile' />
      <Box sx={{ maxWidth: 500 }} mx='auto'>
        <h1 className='mb-4'>名前を変更する</h1>
        <ErrorMessage state={state} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            id='rename'
            label='User Name'
            aria-label='User name'
            placeholder={nameState ? nameState.name : ''}
            size='lg'
            required
            icon={<Ballpen size={16} />}
            {...form.getInputProps('name')}
          />
          <Group position='right'>
            <Button
              type='submit'
              size='lg'
              leftIcon={<Book2 size={16} />}
              loading={state.loading}
              className='mt-8'
            >
              変更
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
