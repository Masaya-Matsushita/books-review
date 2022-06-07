import { Detail } from 'components/Detail'
import { HeadComponent as Head } from 'components/Head'
import { useGetDetail } from 'hooks/useGetDetail'
import { useRouter } from 'next/router'

export default function DetailId() {
  const router = useRouter()
  const state = useGetDetail(router.query.id)

  return (
    <>
      <Head title='Detail' />
      <Detail state={state} router={router} />
    </>
  )
}
