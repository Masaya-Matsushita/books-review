import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
import { useRouter } from 'next/router'

export const useAuthFormInitialize = () => {
  const router = useRouter()

  const schema =
    router.pathname === '/signup'
      ? z.object({
          name: z
            .string()
            .min(2, { message: '2文字以上10文字以内で入力してください。' })
            .max(10, { message: '2文字以上10文字以内で入力してください。' }),
          email: z.string().email({ message: '正しく入力されていません。' }),
          password: z.string().regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i, {
            message:
              '「半角英数それぞれ1種類以上を含む6文字以上」で入力してください。',
          }),
        })
      : z.object({
          email: z.string().email({ message: '正しく入力されていません。' }),
          password: z.string().regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i, {
            message:
              '「半角英数それぞれ1種類以上を含む6文字以上」で入力してください。',
          }),
        })

  const form = useForm({
    schema: zodResolver(schema),
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  return form
}
