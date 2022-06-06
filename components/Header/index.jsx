import { Button, Menu, Modal } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import Link from 'next/link'
import { useState } from 'react'
import { useCookies } from 'react-cookie'
import { Check, Logout, Settings } from 'tabler-icons-react'

export const Header = ({ state, router }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['token'])
  const [opened, setOpened] = useState(false)

  const logout = () => {
    // cookieのtokenを削除
    removeCookie('token')

    // ログアウト処理の完了通知
    showNotification({
      disallowClose: true,
      autoClose: 3000,
      title: 'ログアウトしました',
      icon: <Check />,
      color: 'teal',
    })

    // Signinページへ遷移
    router.push('/signin')
  }

  // エラー発生時
  if (state.error) {
    return <div className='flex justify-end'>{state.error}</div>
  }

  // 名前を表示
  if (state.name) {
    return (
      <div>
        <div className='flex justify-end'>
          ログイン済：
          <Menu
            control={
              <span className='underline cursor-pointer'>{state.name}</span>
            }
          >
            <Menu.Label>Menu</Menu.Label>
            <Menu.Item icon={<Settings size={14} />}>
              <Link href='/profile'>
                <a className='text-black no-underline'>User Name</a>
              </Link>
            </Menu.Item>
            <Menu.Item
              color='red'
              icon={<Logout size={14} />}
              onClick={() => setOpened(true)}
            >
              Logout
            </Menu.Item>
          </Menu>
          さん
        </div>
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          withCloseButton={false}
          className='mt-16 text-center'
        >
          <h3>{state.name}さん</h3>
          <div>ログアウトしますか？</div>
          <Button
            variant='outline'
            onClick={() => setOpened(false)}
            className='mx-4 mt-6'
          >
            キャンセル
          </Button>
          <Button
            color='red'
            variant='outline'
            onClick={logout}
            className='mx-4 mt-6'
          >
            ログアウト
          </Button>
        </Modal>
      </div>
    )
  }

  return
}
