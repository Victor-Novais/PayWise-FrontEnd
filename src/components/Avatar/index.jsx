import arrowDownIcon from "../../assets/arrow-down-icon.svg";
import { getInitials } from "../../utils/functions";
import "./avatar.css";

export default function Avatar({ showPopup, setShowPopup }) {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <div className="avatar">
      <div>{getInitials(user.username)}</div>
      <h4>{user.username}</h4>
      <img
        src={arrowDownIcon}
        alt="menu do usuário"
        onClick={() => setShowPopup(!showPopup)}
      />
    </div>
  );
}
