import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './App'
import { store } from './store/store'

import './index.css'

const root: HTMLElement | null = document.getElementById('root')

if (!root) {
  throw new Error("Root element with id 'root' not found")
} else if (root) {
  createRoot(root).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
  )
}


