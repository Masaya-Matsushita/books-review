import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'

export const StyleProvider = ({ children }) => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <NotificationsProvider>{children}</NotificationsProvider>
      </MantineProvider>
    </>
  )
}
