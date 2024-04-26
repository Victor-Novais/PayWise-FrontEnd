import { useLocation } from "react-router-dom";
import ChargeIcon from "../../assets/charge-icon.svg";
import ClientIcon from "../../assets/client-icon.svg";
import "./subHeader.css";

export default function SubHeader({ title, children }) {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="subHeader">
      <div className="left">
        {path !== "/charges" && <img src={ClientIcon} alt="icon" />}
        {path === "/charges" && <img src={ChargeIcon} alt="icon" />}
        <h3>{title}</h3>
      </div>
      <div className="right">{children}</div>
    </div>
  );
}
