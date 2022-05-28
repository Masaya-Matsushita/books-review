import { MantineProvider } from '@mantine/core'
import { Header } from 'components/Header'
import { createContext, useState } from 'react'
import 'styles/globals.css'

export const TokenContext = createContext({
  token: undefined,
  setToken: () => {
    throw new Error('no setting!')
  },
})

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(undefined)

  return (
    <>
      <Header />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <TokenContext.Provider value={{ token, setToken }}>
          <Component {...pageProps} />
        </TokenContext.Provider>
      </MantineProvider>
    </>
  )
}

export default MyApp
