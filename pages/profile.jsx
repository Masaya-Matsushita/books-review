import { HeadComponent as Head } from 'components/Head'
import { useGetName } from 'hooks/useGetName'

export default function Profile() {
  const state = useGetName()

  return (
    <div>
      <Head title='profile' />
      <div>{state.name}</div>
    </div>
  )
}
