import { Header } from 'components/Header'
import Head from 'next/head'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <div className='flex justify-center'>
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
