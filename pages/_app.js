import React from 'react'
import App from 'next/app'

import 'normalize.css'
import '../styles/globals.scss'

// Based on https://adamwathan.me/2019/10/17/persistent-layout-patterns-in-nextjs/
class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props

    const getLayout = Component.getLayout || (page => page)

    return getLayout(<Component {...pageProps}></Component>)
  }
}

export default MyApp
