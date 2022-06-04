import { Box, Button, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import { HeadComponent as Head } from 'components/Head'
import { useGetName } from 'hooks/useGetName'
import { useLoadState } from 'hooks/useLoadState'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { Ballpen, Book2, Check } from 'tabler-icons-react'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: '2文字以上10文字以内で入力してください。' })
    .max(10, { message: '2文字以上10文字以内で入力してください。' }),
})

export default function Profile() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const nameState = useGetName()
  const router = useRouter()
  const { state, dispatch } = useLoadState()

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
    },
  })

  const handleSubmit = async (value) => {
    dispatch({ type: 'start' })
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

      if (!res.ok) {
        dispatch({ type: 'error', error: json.ErrorMessageJP })
        return
      }

      dispatch({ type: 'end' })

      router.push('/')
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 3000,
        title: `ようこそ！${value.name}さん`,
        message: 'ユーザーネームを変更しました',
        icon: <Check />,
        color: 'teal',
      })
      
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  return (
    <div className='bg-slate-100'>
      <Head title='profile' />
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <h1 className='mb-4'>名前を変更する</h1>
        {state.error ? (
          <div className='text-lg font-bold text-red-500'>
            Error：{state.error}
          </div>
        ) : null}
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
    </div>
  )
}
