import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import { CookiesProvider } from 'react-cookie'

export const StateProvider = ({ children }) => {
  return (
    <div>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>
          <CookiesProvider>{children}</CookiesProvider>
        </NotificationsProvider>
      </MantineProvider>
    </div>
  )
}
