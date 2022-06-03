import { Box, Button, Group, TextInput } from '@mantine/core'
import { useForm, zodResolver } from '@mantine/form'
import { HeadComponent as Head } from 'components/Head'
import { useGetName } from 'hooks/useGetName'
import { Ballpen, Book2 } from 'tabler-icons-react'
import { z } from 'zod'

const schema = z.object({
  name: z
    .string()
    .min(2, { message: '2文字以上10文字以内で入力してください。' })
    .max(10, { message: '2文字以上10文字以内で入力してください。' }),
})

export default function Profile() {
  const state = useGetName()

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
    },
  })

  return (
    <div className='bg-slate-100'>
      <Head title='profile' />
      <Box sx={{ maxWidth: 400 }} mx='auto'>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            id='rename'
            label='User Name'
            aria-label='User name'
            placeholder={state ? state.name : ''}
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
              // loading={state.loading}
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
