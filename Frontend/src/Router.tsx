import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import Events from "./views/Events";

export default function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<AppLayout/>}>
                <Route path="/events" element={<Events />} />
            </Route>
        </Routes>
    </BrowserRouter>
      
  )
}
