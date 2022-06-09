import { Box, Button, Group, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { ErrorMessage } from 'components/ErrorMessage'
import { HeadComponent as Head } from 'components/Head'
import { useEditFormInitialize } from 'hooks/useEditFormInitialize'
import { useLoadState } from 'hooks/useLoadState'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { Ballpen, Book2, Bulb, Check, Link, Mail } from 'tabler-icons-react'

export default function New() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = useLoadState()
  const router = useRouter()
  const form = useEditFormInitialize()

  const handleSubmit = async (values) => {
    // ローディング開始
    dispatch({ type: 'start' })

    // 投稿を作成
    try {
      const res = await fetch(
        'https://api-for-missions-and-railways.herokuapp.com/books',
        {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.token}`,
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

      // ローディング解除
      dispatch({ type: 'end' })

      // 画面下に完了通知
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: '投稿しました',
        icon: <Check />,
        color: 'teal',
      })

      //　一覧ページへ遷移
      router.push({ pathname: '/', query: { page: 1 } })

      // fetchが失敗した場合
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  return (
    <>
      <Head title='New' />
      <Box sx={{ maxWidth: 800 }} mx='auto'>
        <h1 className='mb-4'>投稿を作成</h1>
        <ErrorMessage state={state} />
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='書籍名'
            aria-label='書籍名'
            placeholder='（例）銀河鉄道の夜'
            required
            size='lg'
            className='mt-4'
            icon={<Book2 size={16} />}
            {...form.getInputProps('title')}
          />
          <Textarea
            label='要約'
            area-label='要約'
            placeholder='宮沢賢治の代表作。孤独な少年ジョバンニが宇宙を旅する物語。'
            required
            size='lg'
            className='mt-4'
            icon={<Bulb size={16} />}
            {...form.getInputProps('detail')}
          />
          <Textarea
            label='レビュー'
            area-label='レビュー'
            placeholder='本当の幸せとは何なのか、大切なことを教えてくれました。'
            required
            size='lg'
            className='mt-4'
            icon={<Ballpen size={16} />}
            {...form.getInputProps('review')}
          />
          <TextInput
            label='URL'
            aria-label='URL'
            placeholder='http://www.example.com'
            icon={<Link size={16} />}
            required
            className='mt-4'
            {...form.getInputProps('url')}
          />
          <Group position='right'>
            <Button
              type='submit'
              size='lg'
              leftIcon={<Mail size={16} />}
              loading={state.loading}
              className='mt-10'
            >
              投稿
            </Button>
          </Group>
        </form>
      </Box>
    </>
  )
}
