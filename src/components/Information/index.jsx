import "./inform.css";
import deletIcon from "../../assets/delet.svg";
import editIcon from "../../assets/edit-icon.svg";
import frameIcon from "../../assets/frame.svg";
import SubHeader from "../../components/SubHeader";
import useModalContext from "../../hooks/useModalContext";

function Inform({ data }) {
  const { setmodalEditClientOpened } = useModalContext();
  const { setEditChargesOpened } = useModalContext();
  const { setChargeDeleteConfirmEditOpened } = useModalContext();
  const { setAddChargesOpened } = useModalContext();
  if (!data.existingClient) {
    return <div>No data available</div>;
  }

  function handleEditCharge(charge) {
    localStorage.setItem("currentCharge", charge);
    setEditChargesOpened(true);
  }
  function handleEditClient(client) {
    localStorage.setItem("currentCharge", client);
    setmodalEditClientOpened(true);
  }
  function handleConfirmDelete(charge) {
    localStorage.setItem("currentCharge", charge);
    setChargeDeleteConfirmEditOpened(true);
  }
  function handleAddCharge(client) {
    localStorage.setItem("currentClient", client);
    setAddChargesOpened(true);
  }
  return (
    <>
      <SubHeader title={data.existingClient.name} />
      <div className="container-inform">
        <div className="details-header-client">
          <span className="date-client">Dados do cliente</span>
          <button
            className="btn-cancel"
            onClick={() =>
              handleEditClient(JSON.stringify(data.existingClient))
            }
          >
            Editar Cliente
          </button>
        </div>
        <div className="details-inf">
          <div className="inf-clients-title">
            <strong>E-mail</strong>
            <br />
            <span>{data.existingClient.email}</span>
          </div>
          <div className="inf-clients-title">
            <strong>Telefone</strong>
            <br />
            <span>{data.existingClient.phone}</span>
          </div>
          <div className="inf-clients-title" style={{ width: "400px" }}>
            <strong>CPF</strong>
            <br />
            <span>{data.existingClient.cpf}</span>
          </div>
          <div className="details-inf">
            <div className="inf-clients-title">
              <strong>Endereço</strong>
              <br />
              <span>{data.existingClient.street}</span>
            </div>
            <div className="inf-clients-title">
              <strong>Bairro</strong>
              <br />
              <span>{data.existingClient.neighborhood}</span>
            </div>
            <div className="inf-clients-title">
              <strong>Complemento</strong>
              <br />
              <span>{data.existingClient.complement}</span>
            </div>
            <div className="inf-clients-title">
              <strong>CEP</strong>
              <br />
              <span>{data.existingClient.zipcode}</span>
            </div>
            <div className="inf-clients-title">
              <strong>Cidade</strong>
              <br />
              <span>{data.existingClient.city}</span>
            </div>
            <div className="inf-clients-title">
              <strong>UF</strong>
              <br />
              <span>{data.existingClient.state}</span>
            </div>
          </div>
        </div>

        <div className="container-inform-charge">
          <div className="details-header-client">
            <strong className="charge-details">Cobranças do cliente </strong>
            <button
              className="btn-newcharge"
              onClick={() =>
                handleAddCharge(JSON.stringify(data.existingClient))
              }
            >
              + Nova Cobrança
            </button>
          </div>
          <div className="TableChargeHead">
            <div>
              <img src={frameIcon} alt="" style={{ cursor: "pointer" }} />
              <h1>Cliente</h1>
            </div>
            <div>
              <img src={frameIcon} alt="" style={{ cursor: "pointer" }} />
              <h1>ID Cob.</h1>
            </div>
            <h1>Valor</h1>
            <h1>Data de venc.</h1>
            <h1>Status</h1>
            <h1>Descrição</h1>
          </div>
          <div className="dividerHorizontal"></div>

          {data.charges.map((charge) => (
            <>
              <div className="TablechargeList" key={charge.id}>
                <div>
                  <p className="divFont">{data.existingClient.name}</p>
                </div>
                <div>
                  <p className="divFont">{charge.id_pt}</p>
                </div>
                <div>
                  <p className="divFont">{charge.amount_pt}</p>
                </div>
                <div>
                  <p className="divFont">{charge.due_date_pt}</p>
                </div>
                <div>
                  <p className={charge.status_pt}>{charge.status_pt}</p>
                </div>
                <div>
                  <p className="divFont">{charge.description}</p>
                </div>
                <div className="tableIcons">
                  <img
                    src={editIcon}
                    alt="editar"
                    onClick={() => handleEditCharge(JSON.stringify(charge))}
                  />
                  <img
                    src={deletIcon}
                    alt="excluir"
                    onClick={() => handleConfirmDelete(JSON.stringify(charge))}
                  />
                </div>
              </div>
              <div className="dividerHorizontal"></div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Inform;
