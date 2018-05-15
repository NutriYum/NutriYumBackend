import React from 'react'

import {Navbar} from './components'
import Routes from './routes'
import Favicon from 'react-favicon';

const App = () => {
  return (
    <div>
      <Favicon imgqwdqwd src='../public/favicon.ico' />
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
