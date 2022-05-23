import Link from 'next/link'
import styles from 'components/Header/Header.module.css'

export const Header = () => {
  const pages = [
    { path: '/', name: 'index' },
    { path: '/signup', name: 'signup' },
    { path: '/login', name: 'login' },
  ]

  return (
    <div className={styles.header}>
      {pages.map((page) => (
        <Link key={page.path} href={page.path}>
          <a className={styles.anchor}>{page.name}</a>
        </Link>
      ))}
    </div>
  )
}
