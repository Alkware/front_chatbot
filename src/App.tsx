import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Index from "./pages/home/Index"
import Login from "./pages/Login/Login"
import Panel from "./pages/panel/Panel"
import Thanks from "./pages/thanks/Thanks"
import { CreateChat } from "./pages/create_chat/CreateChat"
import { CreateDatabase } from "./pages/create_database/CreateDatabase"
import { Modal } from "./components/modal/Modal"

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
