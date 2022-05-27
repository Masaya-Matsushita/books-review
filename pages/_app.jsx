import { MantineProvider } from '@mantine/core'
import { HeadComponent as Head } from 'components/Head'
import { Header } from 'components/Header'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Header />
        <div className='flex justify-center'>
          <Component {...pageProps} />
        </div>
      </MantineProvider>
    </>
  )
}

export default MyApp
