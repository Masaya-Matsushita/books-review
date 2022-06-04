import { Box, Button, Group, Textarea, TextInput } from '@mantine/core'
import { zodResolver } from '@mantine/form'
import { useForm } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { HeadComponent as Head } from 'components/Head'
import { useLoadState } from 'hooks/useLoadState'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { Ballpen, Book2, Bulb, Check, Link, Mail } from 'tabler-icons-react'
import { z } from 'zod'

const schema = z.object({
  title: z.string().trim().min(2, { message: '2文字以上で入力してください。' }),
  detail: z.string().trim(),
  review: z.string().trim(),
  url: z.string().trim().url(),
})

export default function New() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = useLoadState()
  const router = useRouter()

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      title: '',
      detail: '',
      review: '',
      url: '',
    },
  })

  const handleSubmit = async (values) => {
    dispatch({ type: 'start' })
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

      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      dispatch({ type: 'end' })

      router.push('/')
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 5000,
        title: '投稿しました',
        icon: <Check />,
        color: 'teal',
      })
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  return (
    <div className='bg-slate-100'>
      <Head title='New' />
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <h1 className='mb-4'>投稿を作成</h1>
        {state.error ? (
          <div className='text-lg font-bold text-red-500'>
            Error：{state.error}
          </div>
        ) : null}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='書籍名'
            aria-label='書籍名'
            placeholder='（例）銀河鉄道の夜'
            required
            icon={<Book2 size={16} />}
            {...form.getInputProps('title')}
          />
          <Textarea
            label='要約'
            area-label='要約'
            placeholder='宮沢賢治の代表作。孤独な少年ジョバンニが宇宙を旅する物語。'
            required
            icon={<Bulb size={16} />}
            {...form.getInputProps('detail')}
          />
          <Textarea
            label='レビュー'
            area-label='レビュー'
            placeholder='本当の幸せとは何なのか、大切なことを教えてくれました。'
            required
            icon={<Ballpen size={16} />}
            {...form.getInputProps('review')}
          />
          <TextInput
            label='URL'
            aria-label='URL'
            placeholder='http://www.example.com'
            required
            icon={<Link size={16} />}
            {...form.getInputProps('url')}
          />
          <Group position='right'>
            <Button
              type='submit'
              size='lg'
              leftIcon={<Mail size={16} />}
              loading={state.loading}
              className='mt-8'
            >
              投稿
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}
