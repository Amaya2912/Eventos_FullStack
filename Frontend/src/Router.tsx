import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Login from "./views/Login";
import Register from "./views/Register";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AppLayout/>}>
                
            </Route>
        </Routes>
    </BrowserRouter>
      
  )
}
