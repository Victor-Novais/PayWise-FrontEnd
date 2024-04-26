import { Link } from "react-router-dom";
import addCharge from "../../assets/add-charge.svg";
import errorIcon from "../../assets/erro.svg";
import frameIcon from "../../assets/frame.svg";
import useModalContext from "../../hooks/useModalContext";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import "./TableClient.css";
import { useEffect, useState } from "react";
export default function TableClient({ title, data, linkTo, consultaPesquisa }) {
  const { setAddChargesOpened } = useModalContext();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const [ordenacaoAscendente, setOrdenacaoAscendente] = useState(true);

  const toggleOrdenacao = () => {
    setOrdenacaoAscendente(!ordenacaoAscendente);
  };

  const ordenarDados = (a, b) => {
    const compare = a.name.localeCompare(b.name);
    return ordenacaoAscendente ? compare : -compare;
  };

  const dadosFiltrados = data.filter((cliente) => {
    return (
      cliente.name.toLowerCase().includes(consultaPesquisa.toLowerCase()) ||
      cliente.cpf.includes(consultaPesquisa) ||
      cliente.email.toLowerCase().includes(consultaPesquisa.toLowerCase())
    );
  });

  function handleAddCharge(client) {
    localStorage.setItem("currentClient", client);
    setAddChargesOpened(true);
  }

  return (
    <div className="TableClient">
      <div className="TableClientHead">
        <div>
          {" "}
          <img
            src={frameIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={toggleOrdenacao}
          />
          <h1>Cliente</h1>
        </div>
        <div>
          <h1>CPF</h1>
        </div>
        <h1>E-mail</h1>
        <h1>Telefone</h1>
        <h1>Status</h1>
        <h1>Criar Cobrança</h1>
      </div>
      <div className="dividerHorizontal"></div>
      {isLoading ? (
        <Box className="loading">
          <CircularProgress style={{ color: "var(--principal-rosa)" }} />
        </Box>
      ) : dadosFiltrados.length === 0 ? (
        <div>
          <img src={errorIcon} alt="Erro" className="error-icon" />
        </div>
      ) : (
        dadosFiltrados.sort(ordenarDados).map((client) => (
          <>
            <div className="TableClientList" key={client.id}>
              <div>
                {" "}
                <Link to={`/client/${client.id}`}>
                  <p className="TableClientListText">{client.name}</p>
                </Link>
              </div>
              <div>
                {" "}
                <p className="TableClientListText">{client.cpf}</p>
              </div>
              <div>
                {" "}
                <p className="TableClientListText">{client.email}</p>
              </div>
              <div>
                {" "}
                <p className="TableClientListText">{client.phone}</p>
              </div>
              <div>
                {" "}
                <p className={client.defaulter ? "inadimplente" : "em-dia"}>
                  {client.defaulter ? "Inadimplente" : "Em dia"}
                </p>
              </div>
              <img
                src={addCharge}
                alt=""
                onClick={() => handleAddCharge(JSON.stringify(client))}
              />
            </div>
            <div className="dividerHorizontal"></div>
          </>
        ))
      )}
    </div>
  );
}
