import { createContext, useEffect, useState } from 'react'

export const CookieContext = createContext(undefined)
export const CookieDispatchContext = createContext(() => {
  throw new Error('cookie dispatch error!')
})
export const isLoginContext = createContext(false)
export const isLoginDispatchContext = createContext(() => {
  throw new Error('isLogin dispatch error!')
})

export const StateProvider = ({ children }) => {
  const [cookie, setCookie] = useState(undefined)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const cookieArray = document.cookie.split('=')
    setCookie(cookieArray[1])
  }, [isLogin])

  return (
    <>
      <CookieContext.Provider value={cookie}>
        <CookieDispatchContext.Provider value={setCookie}>
          <isLoginContext.Provider value={isLogin}>
            <isLoginDispatchContext.Provider value={setIsLogin}>
              {children}
            </isLoginDispatchContext.Provider>
          </isLoginContext.Provider>
        </CookieDispatchContext.Provider>
      </CookieContext.Provider>
    </>
  )
}
