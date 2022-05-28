import { MantineProvider } from '@mantine/core'
import { Header } from 'components/Header'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
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
