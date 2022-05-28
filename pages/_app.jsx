import { MantineProvider } from '@mantine/core'
import { Header } from 'components/Header'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  )
}

export default MyApp
