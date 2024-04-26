import PaidChargesIcon from "../../assets/paid-charges-icon.svg";
import OverdueChargesIcon from "../../assets/overdue-charges-icon.svg";
import PendingChargesIcon from "../../assets/pending-charges-icon.svg";
import "./amountBalloon.css";

export default function AmountBalloon({ status, title, total }) {
  let ballonIcon = "";

  if (status === "paid") {
    ballonIcon = PaidChargesIcon;
  }

  if (status === "overdue") {
    ballonIcon = OverdueChargesIcon;
  }

  if (status === "pending") {
    ballonIcon = PendingChargesIcon;
  }

  return (
    <div className={`amountBalloon ${status}`}>
      <img src={ballonIcon} alt={title} />
      <div>
        <h4>{title}</h4>
        <h3>{total}</h3>
      </div>
    </div>
  );
}
