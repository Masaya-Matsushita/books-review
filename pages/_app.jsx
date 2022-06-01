import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { createContext, useEffect, useState } from 'react'
import 'styles/globals.css'

export const CookieContext = createContext(undefined)

export const isLoginContext = createContext({
  isLogin: false,
  setIsLogin: () => {
    throw new Error('isLogin error!')
  },
})

function MyApp({ Component, pageProps }) {
  const [cookie, setCookie] = useState(undefined)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const cookieArray = document.cookie.split('=')
    setCookie(cookieArray[1])
  }, [isLogin])

  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <CookieContext.Provider value={cookie}>
            <isLoginContext.Provider value={{ isLogin, setIsLogin }}>
              <Component {...pageProps} />
            </isLoginContext.Provider>
          </CookieContext.Provider>
        </NotificationsProvider>
      </MantineProvider>
    </>
  )
}

export default MyApp
