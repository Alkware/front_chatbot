import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import Thanks from "./pages/Thanks/Thanks"
import { Home } from "./pages/Home/Home"
import { CreateChat } from "./pages/CreateChat/CreateChat"
import { Modal } from "./components/modal/Modal"
import { CreateDatabase } from "./pages/CreateDatabase/CreateDatabase"
import { Plans } from "./pages/Plans/Plans"
import { Admin } from "./pages/Admin/Admin"
import { Suspense, lazy } from "react"
import { InputLoading } from "./components/loading/InputLoading"

const Panel = lazy(()=> import("./pages/Panel/Panel"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-first-link" element={<h1>Create a first link</h1>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/panel" element={<Suspense fallback={<InputLoading />}><Panel /></Suspense>} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/admin/panel" element={<Admin />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/create-chat/:plan_management_id" element={<CreateChat />} />
        <Route path="/create-database/:plan_management_id" element={<CreateDatabase />} />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>

      <Modal />

    </BrowserRouter>
  )
}

export default App
