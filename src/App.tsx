import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Index from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Panel from "./pages/Panel/Panel"
import Thanks from "./pages/Thanks/Thanks"
import { CreateChat } from "./pages/CreateChat/CreateChat"
import { Modal } from "./components/modal/Modal"
import { CreateDatabase } from "./pages/CreateDatabase/CreateDatabase"

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/create-chat/:plan_management_id" element={<CreateChat />} />
        <Route path="/create-database/:plan_management_id" element={<CreateDatabase />} />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>

      <Modal />

    </BrowserRouter>
  )
}

export default App
