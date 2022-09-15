import React, { useState } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react"
import { AnimatePresence } from 'framer-motion'
import '../styles/globals.css'
import NextNProgress from "nextjs-progressbar";
import Nav from '../components/Nav'
import ContextProvider from '../store';

function MyApp({ Component, pageProps, router }) {
  const [queryClient] = useState(() => new QueryClient())
  return <>
    <SessionProvider session={pageProps.session} refetchInterval={1000}>
      <ContextProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <Toaster
              position="top-center"
              reverseOrder={false}
              gutter={12}
            />
            <NextNProgress
              color="#7659ff"
              startPosition={0.3}
              stopDelayMs={200}
              height={3}
              spinner={false}
              showOnShallow={false}
            />
            <Nav />
            <AnimatePresence exitBeforeEnter >
              <Component {...pageProps} />
            </AnimatePresence>
          </Hydrate>
        </QueryClientProvider>
      </ContextProvider>
    </SessionProvider>
  </>
}

export default MyApp
