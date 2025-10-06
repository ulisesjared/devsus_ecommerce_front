import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './common/hooks/ToastProvider'
import QueryProvider from './common/hooks/QueryProvider'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppRouter from './common/Navigation/Router'
import { CartProvider } from './Screens/Cart/hooks/CartProvider'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ToastProvider>
          <QueryProvider>
            <CartProvider>
              <AppRouter />
              <ReactQueryDevtools />
            </CartProvider>
          </QueryProvider>
        </ToastProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
