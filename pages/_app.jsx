// import { StateProvider } from 'components/StateProvider'
import { StyleProvider } from 'components/StyleProvider'
import { CookiesProvider } from 'react-cookie'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StyleProvider>
        {/* <StateProvider> */}
        <CookiesProvider>
          <Component {...pageProps} />
        </CookiesProvider>
        {/* </StateProvider> */}
      </StyleProvider>
    </>
  )
}

export default MyApp
