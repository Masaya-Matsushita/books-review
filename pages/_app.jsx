import { StateProvider } from 'components/StateProvider'
import { StyleProvider } from 'components/StyleProvider'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StyleProvider>
        <StateProvider>
          <Component {...pageProps} />
        </StateProvider>
      </StyleProvider>
    </>
  )
}

export default MyApp
