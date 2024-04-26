import { Link } from "react-router-dom";
import "./SummaryTableClient.css";

export default function SummaryTableClient({ status, title, data, linkTo }) {
  return (
    <div className="summaryTableClient">
      <div className="summaryTableClientHead">
        <h4>{title}</h4>
        <span className={`summaryTableClientHeadCount ${status}`}>
          {data.count}
        </span>
      </div>
      <div className="tableHeaderClient">
        <div className="tableCellClient">Cliente</div>
        <div className="tableCellClient">ID do clie.</div>
        <div className="tableCellClient">CPF</div>
      </div>

      {data.clients.map((client) => (
        <div className="tableRowClient" key={client.id}>
          <div className="tableCellClient">{client.name}</div>
          <div className="tableCellClient">{client.id_pt}</div>
          <div className="tableCellClient">{client.cpf}</div>
        </div>
      ))}

      <div className="summaryTableClientFooter">
        {data.clients.length > 0 && <Link to={linkTo}>Ver todos</Link>}
        {data.clients.length === 0 && <p>Nenhum registro encontrado</p>}
      </div>
    </div>
  );
}
