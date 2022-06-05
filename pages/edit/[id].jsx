import { Box, Button, Group, Textarea, TextInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { HeadComponent as Head } from 'components/Head'
import { useEditFormInitialize } from 'hooks/useEditFormInitialize'
import { useGetDetail } from 'hooks/useGetDetail'
import { useLoadState } from 'hooks/useLoadState'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import {
  Ballpen,
  Book2,
  Bulb,
  Check,
  Link,
  Mail,
  Trash,
} from 'tabler-icons-react'

export default function EditId() {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const { state, dispatch } = useLoadState()
  const router = useRouter()
  const detailState = useGetDetail()
  const form = useEditFormInitialize()

  useEffect(
    detailState.detail
      ? () => {
          form.setValues({
            ...form.values,
            title: detailState.detail.title,
            detail: detailState.detail.detail,
            review: detailState.detail.review,
            url: detailState.detail.url,
          })
        }
      : () => {},
    [detailState]
  )

  const handleSubmit = async (values) => {
    dispatch({ type: 'start' })
    try {
      const res = await fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books/${router.query.id}`,
        {
          method: 'PUT',
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
        title: '更新しました',
        icon: <Check />,
        color: 'teal',
      })
    } catch (error) {
      dispatch({ type: 'error', error: error.message })
    }
  }

  const deletePost = async () => {
    dispatch({ type: 'start' })
    try {
      fetch(
        `https://api-for-missions-and-railways.herokuapp.com/books/${router.query.id}`,
        {
          method: 'DELETE',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${cookies.token}`,
          },
        }
      )

      //　もしエラー情報のレスポンスが帰ってきた場合、受け取りたい
      // if (!res.ok) {
      //   const json = await res.json()
      //   dispatch({ type: 'error', error: json.ErrorMessageJP })
      //   return
      // }

      dispatch({ type: 'end' })

      router.push('/')
      showNotification({
        id: 'redilectToTop',
        disallowClose: true,
        autoClose: 5000,
        title: 'レビューを削除しました',
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
        <h1 className='mb-4'>投稿を更新</h1>
        {state.error ? (
          <div className='text-lg font-bold text-red-500'>
            Error：{state.error}
          </div>
        ) : null}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='書籍名'
            aria-label='書籍名'
            placeholder={detailState.detail ? detailState.detail.title : ''}
            required
            icon={<Book2 size={16} />}
            {...form.getInputProps('title')}
          />
          <Textarea
            label='要約'
            area-label='要約'
            placeholder={detailState.detail ? detailState.detail.detail : ''}
            required
            icon={<Bulb size={16} />}
            {...form.getInputProps('detail')}
          />
          <Textarea
            label='レビュー'
            area-label='レビュー'
            placeholder={detailState.detail ? detailState.detail.review : ''}
            required
            icon={<Ballpen size={16} />}
            {...form.getInputProps('review')}
          />
          <TextInput
            label='URL'
            aria-label='URL'
            placeholder={detailState.detail ? detailState.detail.url : ''}
            icon={<Link size={16} />}
            required
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
              更新
            </Button>
            <Button
              size='lg'
              color='red'
              leftIcon={<Trash size={16} />}
              // loading={state.loading}
              onClick={deletePost}
              className='mt-8'
            >
              削除
            </Button>
          </Group>
        </form>
      </Box>
    </div>
  )
}
