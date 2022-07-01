import React, {useState} from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import Nav from '../components/Nav'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return <>
    <QueryClientProvider client={queryClient}>
       <Hydrate state={pageProps.dehydratedState}>
        <Nav/>
         <Component {...pageProps} />
       </Hydrate>
     </QueryClientProvider>
  </>
}

export default MyApp
