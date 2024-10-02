import './index.css'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import ClientProvider from './context/ClientContext.tsx'
import { ModalProvider } from './context/ModalContext.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ClientProvider>
    <ModalProvider>
          <App />
    </ModalProvider>
  </ClientProvider>,
);
