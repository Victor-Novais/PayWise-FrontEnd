import { NavLink } from "react-router-dom";
import "./navItem.css";

export default function NavItem({ icon, label, page }) {
  return (
    <div className="navItem">
      <NavLink to={page}>
        <img src={icon} alt={label} />
        <div>{label}</div>
      </NavLink>
    </div>
  );
}
