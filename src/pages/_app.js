
import * as React from 'react'
import '../../styles/globals.css'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { ThemeProvider, CssBaseline } from '@mui/material'
import createEmotionCache from '../createEmotionCache'
import { CacheProvider } from '@emotion/react'
import { ToastyProvider } from '../contexts/Toasty'
import theme from '../theme'


const clientSideEmotionCache = createEmotionCache()

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Anunx</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <ToastyProvider>
          <CssBaseline />
          <Component {...pageProps} />
        </ToastyProvider>
      </ThemeProvider>
    </CacheProvider>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  emotionCache: PropTypes.object,
}
