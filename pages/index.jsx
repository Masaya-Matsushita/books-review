import { HeadComponent as Head } from 'components/Head'
import { TokenContext } from 'pages/_app'
import { useContext } from 'react'

export default function Home() {
  const { token } = useContext(TokenContext)

  return (
    <div>
      <Head title='index page' />
      <h1>Index Page</h1>
      {token ? <div>{token}</div> : null}
    </div>
  )
}
