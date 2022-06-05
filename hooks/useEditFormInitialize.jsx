import { useForm, zodResolver } from '@mantine/form'
import { z } from 'zod'

const schema = z.object({
  title: z.string().trim().min(2, { message: '2文字以上で入力してください。' }),
  detail: z
    .string()
    .trim()
    .min(2, { message: '2文字以上で入力してください。' }),
  review: z
    .string()
    .trim()
    .min(2, { message: '2文字以上で入力してください。' }),
  url: z.string().trim().url(),
})

export const useEditFormInitialize = () => {
  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      title: '',
      detail: '',
      review: '',
      url: '',
    },
  })

  return form
}
