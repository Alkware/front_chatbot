import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Modal } from "./components/modal/Modal"
import { PageNotFound } from "./pages/PageNotFound/PageNotFound"


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/first-access" element={<FirstAccess />} />
        <Route path="/panel" element={<Panel />} />
        <Route path="/thank" element={<Thanks />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/create-chat/:plan_management_id" element={<CreateChat />} />
        <Route path="/create-database/:plan_management_id" element={<CreateDatabase />} />
        <Route path="/polices" element={<Police />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/confirm-email" element={<ConfirmEmail />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> */}
        <Route path="/*" element={<PageNotFound />} />
      </Routes>

      <Modal />

    </BrowserRouter>
  )
}

export default App
