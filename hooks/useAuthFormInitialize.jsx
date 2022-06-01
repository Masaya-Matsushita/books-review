import { z } from 'zod'
import { useForm, zodResolver } from '@mantine/form'
// import PropTypes from 'prop-types'

export const useAuthFormInitialize = (mode) => {
  //フォームのバリデーションを定義
  const schema =
    // サインアップ画面の場合(name有り)
    mode === 'users'
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
      : // サインイン画面の場合(name無し)
        z.object({
          email: z.string().email({ message: '正しく入力されていません。' }),
          password: z.string().regex(/^(?=.*?[a-z])(?=.*?\d)[a-z\d]{6,100}$/i, {
            message:
              '「半角英数それぞれ1種類以上を含む6文字以上」で入力してください。',
          }),
        })

  // フォームの初期設定
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

// useAuthFormInitialize.Proptypes = {
//   mode: PropTypes.oneOf(['users', 'signin']),
// }
