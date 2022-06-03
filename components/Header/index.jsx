import { Menu } from '@mantine/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { Logout, Settings } from 'tabler-icons-react'

export const Header = ({ state }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const router = useRouter()

  const logout = () => {
    removeCookie('token')
    router.push('/signin')
  }

  if (state.error) {
    return <div className='flex justify-end'>{state.error}</div>
  }

  if (state.name) {
    return (
      <div className='flex justify-end'>
        ログイン済：
        <Menu control={<span>{state.name}</span>}>
          <Menu.Label>Menu</Menu.Label>
          <Menu.Item icon={<Settings size={14} />}>
            <Link href='/profile'>
              <a>User Name</a>
            </Link>
          </Menu.Item>
          <Menu.Item color='red' icon={<Logout size={14} />} onClick={logout}>
            Logout
          </Menu.Item>
        </Menu>
        さん
      </div>
    )
  }

  return
}
