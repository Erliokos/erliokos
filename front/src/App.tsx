import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { MainRouter } from './Router'
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
import { GlobalStyles } from './globalStyle'
import { NotificationProvider } from 'components/Notifications/NotificationContext'
import { NotificationContainer } from 'components/Notifications/NotificationContainer'
import { Layout } from 'components/Layout/Layout'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <BrowserRouter>
            <Layout>
              <MainRouter />
            </Layout>
            <GlobalStyles />
            <NotificationContainer />
          </BrowserRouter>
        </NotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
