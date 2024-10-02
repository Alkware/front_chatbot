import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import { Thanks } from "./pages/Thanks/Thanks"
import { Home } from "./pages/Home/Home"
import { CreateChat } from "./pages/CreateChat/CreateChat"
import { PlansPage } from "./pages/Plans/Plans"
import { lazy } from "react"
import { Police } from "./pages/Police/Police"
import { Terms } from "./pages/Terms/Terms"
import { Cookies } from "./pages/Cookies/Cookies"
import { FirstAccess } from "./pages/FirstAccess/FirstAccess"
import { ConfirmEmail } from "./pages/ConfirmEmail/ConfirmEmail"
import { ForgotPassword } from "./pages/ForgotPassword/ForgotPassword"
import { CreateProduct } from "./pages/CreateProduct/CreateProduct"
import { CreateService } from "./pages/CreateService/CreateService"
import { CreateArtificialIntelligence } from "./pages/CreateArtificialIntelligence/CreateArtificialIntelligence"
import { PageNotFound } from "./pages/PageNotFound/PageNotFound"
import { Modal } from './components/modal/Modal.tsx'

const Panel = lazy(() => import("./pages/Panel/Panel"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/first-access" element={<FirstAccess />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/thank" element={<Thanks />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/create-chat/:plan_management_id" element={<CreateChat />} />
        <Route path="/create-ai/:plan_management_id" element={<CreateArtificialIntelligence />} />
        <Route path="/create-product/:plan_management_id/:category_name" element={<CreateProduct />} />
        <Route path="/create-service/:plan_management_id/:category_name" element={<CreateService />} />
        <Route path="/polices" element={<Police />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <Modal />
    </BrowserRouter>
  )
}

export default App
