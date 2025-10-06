import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { persistQueryClient } from '@tanstack/react-query-persist-client';
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister';

const QueryProvider: React.FC<any> = ({ children }) => {

   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            refetchOnWindowFocus: false,
            // tiempo antes de que los datos se consideren obsoletos.
            staleTime: 1000 * 60 * 25, // 25 minutos
            // timpo despues de la ultima consulta para que se borren de cache
            retry: false,
            gcTime: 1000 * 60 * 60 * 24, // 24 horas
         },
      },
   })

   const persister = createSyncStoragePersister({
      storage: window.localStorage,
      key: 'devsus-textil-query'
   });

   persistQueryClient({
      queryClient,
      persister,
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      dehydrateOptions: {
         shouldDehydrateQuery: (query) => query.meta?.persist === true
      },
   });

   return (
      <QueryClientProvider client={queryClient}>
         {children}
      </QueryClientProvider>
   )
}

export default QueryProvider