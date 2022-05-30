import { MantineProvider } from '@mantine/core'
import { Header } from 'components/Header'
import { createContext, useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import 'styles/globals.css'

// トークンを管理
export const TokenContext = createContext({
  token: undefined,
  setToken: () => {
    throw new Error('no setting!')
  },
})

function MyApp({ Component, pageProps }) {
  const [token, setToken] = useState(undefined)
  const [cookie, setCookie, removeCookie] = useCookies(['token'])

  if (token) {
    let tomorrow = new Date()
    tomorrow.setTime(tomorrow.getTime() + 1000 * 3600 * 24)
    setCookie('token', token, { path: '/', expires: tomorrow })
  }

  return (
    <>
      <Header />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <TokenContext.Provider value={{ token, setToken }}>
          <CookiesProvider>
            <Component {...pageProps} />
          </CookiesProvider>
        </TokenContext.Provider>
      </MantineProvider>
    </>
  )
}

export default MyApp
