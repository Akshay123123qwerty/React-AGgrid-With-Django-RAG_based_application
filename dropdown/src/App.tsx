import { BrowserRouter, Routes, Route } from "react-router-dom"
import HandleUI from "./components/HandleUI"
import Register from "./Authentication/Register"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HandleUI />} />
        <Route path="/register" element={<Register/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
