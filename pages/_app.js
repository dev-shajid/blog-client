import React, {useState} from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import Nav from '../components/Nav'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  return <>
    <QueryClientProvider client={queryClient}>
       <Hydrate state={pageProps.dehydratedState}>
       <NextNProgress
        color="#3b49df"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        spinner={false}
        showOnShallow={true}
       />
        <Nav/>
        <Component {...pageProps} />
       </Hydrate>
     </QueryClientProvider>
  </>
}

export default MyApp
