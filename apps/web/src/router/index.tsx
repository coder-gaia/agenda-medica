import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Agenda from "../pages/Agenda";
import { ProtectedRoute } from "../components/ProtectedRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/agenda"
          element={
            <ProtectedRoute>
              <Agenda />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}