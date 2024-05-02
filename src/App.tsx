import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import { Thanks } from "./pages/Thanks/Thanks"
import { Home } from "./pages/Home/Home"
import { CreateChat } from "./pages/CreateChat/CreateChat"
import { Modal } from "./components/modal/Modal"
import { CreateDatabase } from "./pages/CreateDatabase/CreateDatabase"
import { PlansPage } from "./pages/Plans/Plans"
import { Suspense, lazy } from "react"
import { InputLoading } from "./components/loading/InputLoading"
import { Police } from "./pages/Police/Police"
import { Terms } from "./pages/Terms/Terms"
import { Cookies } from "./pages/Cookies/Cookies"
import { FirstAccess } from "./pages/FirstAccess/FirstAccess"

const Panel = lazy(() => import("./pages/Panel/Panel"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/first-access" element={<FirstAccess />} />
        <Route path="/panel" element={<Suspense fallback={<InputLoading />}><Panel /></Suspense>} />
        <Route path="/thanks" element={<Thanks />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/create-chat/:plan_management_id" element={<CreateChat />} />
        <Route path="/create-database/:plan_management_id" element={<CreateDatabase />} />
        <Route path="/polices" element={<Police />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/*" element={<h1>Page not found</h1>} />
      </Routes>

      <Modal />

    </BrowserRouter>
  )
}

export default App
