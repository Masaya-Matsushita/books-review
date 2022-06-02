import { StyleProvider } from 'components/StyleProvider'
import { CookiesProvider } from 'react-cookie'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StyleProvider>
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
      </StyleProvider>
    </>
  )
}

export default MyApp
