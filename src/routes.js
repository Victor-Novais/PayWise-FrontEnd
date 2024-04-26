import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import Layout from "./components/Layout";
import Charges from "./pages/Charges";
import Clients from "./pages/Clients";
import ClientDetail from "./pages/ClientDetail";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

function ProtectedRoutes({ redirectTo }) {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
}

export default function MainRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<ProtectedRoutes redirectTo="/" />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/charges" element={<Charges />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/client/:clientId" element={<ClientDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
