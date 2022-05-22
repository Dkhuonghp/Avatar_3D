import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'
import { tw, setup } from './twind/styled'

setup({
  theme: {
    extend: {
      colors: {
        gray: {
          '1000': '#111111',
        },
      },
    },
  },
})

// ReactDOM.createRoot(document.getElementById('root')).render(<App />)
ReactDOM.render(<App />, document.getElementById('root'))
