import Link from 'next/link'

export const Header = ({ state }) => {
  if (state.error) {
    return <div className='flex justify-end'>{state.error}</div>
  }

  if (state.name) {
    return (
      <div className='flex justify-end'>
        ログイン済：
        <Link href='/profile'>
          <a>{state.name}</a>
        </Link>
        さん
      </div>
    )
  }

  return
}
