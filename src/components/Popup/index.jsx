import { useNavigate } from "react-router-dom";
import useModalContext from "../../hooks/useModalContext";
import editIcon from "../../assets/edit-icon.svg";
import exitIcon from "../../assets/exit-icon.svg";
import "./popup.css";

export default function Popup() {
  const navigate = useNavigate();

  const { setShowPopup, setUserEditOpened } = useModalContext();

  const handleUserEdit = () => {
    setUserEditOpened(true);
    setShowPopup(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="popup">
      <div className="popup-wrapper">
        <img src={editIcon} alt="editar" onClick={handleUserEdit} />
        <img src={exitIcon} alt="sair" onClick={handleLogout} />
      </div>
    </div>
  );
}
