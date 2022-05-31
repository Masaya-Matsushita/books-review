import { Button } from '@mantine/core'
import Link from 'next/link'
import { CookieContext } from 'pages/_app'
import { useContext, useEffect, useState } from 'react'

export const Header = () => {
  const cookie = useContext(CookieContext)
  const [name, setName] = useState(null)

  const pages = [
    { path: '/signup', name: 'signup' },
    { path: '/signin', name: 'signin' },
  ]

  const getName = async (jwt) => {
    try {
      const res = await fetch(
        'https://api-for-missions-and-railways.herokuapp.com/users',
        {
          method: 'GET',
          mode: 'cors',
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      if (!res.ok) {
        throw new Error()
      }
      const json = await res.json()
      setName(json.name)

      // エラー処理
    } catch (error) {
      console.error(error)
    }
  }

  // マウント時
  useEffect(() => {
    cookie ? getName(cookie) : null
  }, [cookie])

  return (
    <div className='flex justify-center'>
      {pages.map((page) => (
        <Link key={page.path} href={page.path}>
          <a>{page.name}</a>
        </Link>
      ))}
      {name ? <div>{name}</div> : <Button>ログイン</Button>}
    </div>
  )
}
