import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import ClientProvider from "./context/ClientContext"
import Index from "./pages/Index/Index"
import PrivateLoginPanel from "./private-routes/privatePanel"

function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<PrivateLoginPanel />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panel" element={<PrivateLoginPanel />} />
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </ClientProvider>

  )
}

export default App
