import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Panel from "./pages/Panel"
import Register from "./pages/Register"
import ClientProvider from "./context/ClientContext"
import Index from "./pages/Index"

function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </ClientProvider>

  )
}

export default App
