import Link from 'next/link'

export const Header = () => {
  const pages = [
    { path: '/', name: 'index' },
    { path: '/signup', name: 'signup' },
    { path: '/login', name: 'login' },
  ]

  return (
    <div className='flex justify-center'>
      {pages.map((page) => (
        <Link key={page.path} href={page.path}>
          <a className='mx-6 my-4'>{page.name}</a>
        </Link>
      ))}
    </div>
  )
}