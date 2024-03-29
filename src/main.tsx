import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ClientProvider from './context/ClientContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClientProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </ClientProvider>,
)
