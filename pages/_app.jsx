import { MantineProvider } from '@mantine/core'
import { Header } from 'components/Header'
import { createContext, useEffect, useState } from 'react'
import 'styles/globals.css'

export const CookieContext = createContext(undefined)

function MyApp({ Component, pageProps }) {
  const [cookie, setCookie] = useState(undefined)

  useEffect(() => {
    const cookieArray = document.cookie.split('=')
    setCookie(cookieArray[1])
  }, [])

  return (
    <>
      <Header />
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <CookieContext.Provider value={{cookie}}>
          <Component {...pageProps} />
        </CookieContext.Provider>
      </MantineProvider>
    </>
  )
}

export default MyApp
