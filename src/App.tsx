import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Index from "./pages/Index/Index"
import Login from "./pages/Login/Login"
import Panel from "./pages/panel/Panel"
import Thanks from "./pages/thanks/Thanks"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
