import useModalContext from "../../hooks/useModalContext";
import { useLocation } from "react-router-dom";
import Avatar from "../Avatar";
import Popup from "../Popup";
import "./header.css";

export default function Header() {
  const { showPopup, setShowPopup } = useModalContext();
  const location = useLocation();
  const path = location.pathname;

  return (
    <header>
      {path === "/home" && <h3>Resumo das cobranças</h3>}
      {path === "/clients" && <h4>Clientes</h4>}
      {path === "/charges" && <h4>Cobranças</h4>}
      {path.includes("/client/") && <h4>{`Clientes > Detalhes do cliente`}</h4>}

      <Avatar showPopup={showPopup} setShowPopup={setShowPopup} />
      {showPopup && <Popup />}
    </header>
  );
}
