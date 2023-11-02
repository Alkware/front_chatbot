import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import ClientProvider from "./context/ClientContext"
import Index from "./pages/Index/Index"
import Login from "./pages/Login/Login"
import Panel from "./pages/panel/Panel"

function App() {
  return (
    <ClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/panel" element={<Panel />} />
          <Route path="/*" element={<h1>Page not found</h1>} />
        </Routes>
      </BrowserRouter>
    </ClientProvider>

  )
}

export default App
