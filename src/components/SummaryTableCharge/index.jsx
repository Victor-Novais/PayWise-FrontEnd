import { Link } from "react-router-dom";
import "./summaryTableCharge.css";

export default function SummaryTableCharge({ status, title, data, linkTo }) {
  return (
    <div className="summaryTableCharge">
      <div className="summaryTableChargeHead">
        <h4>{title}</h4>
        <span className={`summaryTableChargeHeadCount ${status}`}>
          {data.count}
        </span>
      </div>
      <div className="tableHeader">
        <div className="tableCell">Cliente</div>
        <div className="tableCell">Valor</div>
        <div className="tableCell">ID da cob.</div>
      </div>

      {data.charges.map((charge) => (
        <div className="tableRow" key={charge.id}>
          <div className="tableCell">{charge.first_name}</div>
          <div className="tableCell">{charge.amount_pt}</div>
          <div className="tableCell">{charge.id_pt}</div>
        </div>
      ))}

      <div className="summaryTableChargeFooter">
        {data.charges.length > 0 && <Link to={linkTo}>Ver todos</Link>}
        {data.charges.length === 0 && <p>Nenhum registro encontrado</p>}
      </div>
    </div>
  );
}
