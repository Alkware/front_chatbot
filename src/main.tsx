import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ModalProvider } from './context/ModalContext.tsx'
import ClientProvider from './context/ClientContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClientProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </ClientProvider>,
)
