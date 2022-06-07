import { Layout } from 'components/Layout'
import { StateProvider } from 'components/StateProvider'
import 'styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <StateProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </StateProvider>
    </>
  )
}

export default MyApp
