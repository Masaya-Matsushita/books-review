import { Detail } from 'components/Detail'
import { HeadComponent as Head } from 'components/Head'
import { useGetDetail } from 'hooks/useGetDetail'
import { useRouter } from 'next/router'

export default function DetailId() {
  const router = useRouter()
  const state = useGetDetail()

  return (
    <div className='bg-slate-100'>
      <Head title='Detail' />
      <Detail state={state} router={router} />
    </div>
  )
}
