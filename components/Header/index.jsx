import Link from 'next/link'

export const Header = () => {
  const pages = [
    { path: '/', name: 'index' },
    { path: '/signup', name: 'signup' },
    { path: '/signin', name: 'signin' },
  ]

  return (
    <div className='flex justify-center'>
      {pages.map((page) => (
        <Link key={page.path} href={page.path}>
          <a className='my-4 mx-6'>{page.name}</a>
        </Link>
      ))}
    </div>
  )
}
