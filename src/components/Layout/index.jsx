import { Outlet } from "react-router-dom";
import ChargesIcon from "../../assets/charges-icon.svg";
import ClientsIcon from "../../assets/clients-icon.svg";
import HomeIcon from "../../assets/home-icon.svg";
import ModalProvider from "../../contexts/ModalProvider";
import UserEditModal from "../../components/UserEditModal";
import Header from "../Header";
import NavItem from "../NavItem";
import "./layout.css";

export default function Layout() {
  return (
    <div className="container">
      <div className="container-nav">
        <nav>
          <NavItem page="/home" icon={HomeIcon} label="Home" />
          <NavItem page="/clients" icon={ClientsIcon} label="Clientes" />
          <NavItem page="/charges" icon={ChargesIcon} label="Cobranças" />
        </nav>
      </div>
      <div className="content-page">
        <ModalProvider>
          <Header />
          <Outlet />
          <UserEditModal />
        </ModalProvider>
      </div>
    </div>
  );
}
