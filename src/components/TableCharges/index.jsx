import { useEffect, useState } from "react";
import deletIcon from "../../assets/delet.svg";
import editIcon from "../../assets/edit-icon.svg";
import frameIcon from "../../assets/frame.svg";
import errorIcon from "../../assets/erro.svg"
import useModalContext from "../../hooks/useModalContext";

import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "./TableCharge.css";
export default function TableCharge({ title, data, linkTo, consultaPesquisa }) {
  const { setChargeDeleteConfirmEditOpened } = useModalContext();
  const { setChargeInfoOpened } = useModalContext();
  const { setEditChargesOpened } = useModalContext();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 600);
  }, []);

  const [ordenacao, setOrdenacao] = useState(null);
  const [ordenacaoClientesAscendente, setOrdenacaoClientesAscendente] = useState(true);
  const [ordenacaoIdAscendente, setOrdenacaoIdAscendente] = useState(true);

  const toggleOrdenacao = (coluna) => {
    if (coluna === "cliente") {
      setOrdenacaoClientesAscendente(!ordenacaoClientesAscendente);
    } else if (coluna === "idCobranca") {
      setOrdenacaoIdAscendente(!ordenacaoIdAscendente);
    }
  };

  const ordenarDados = (a, b) => {
    if (ordenacao === "cliente") {
      const compare = a.client_name.localeCompare(b.client_name);
      return ordenacaoClientesAscendente ? compare : -compare;
    } else if (ordenacao === "idCobranca") {
      const compare = a.id_pt.localeCompare(b.id_pt);
      return ordenacaoIdAscendente ? compare : -compare;
    } else {
      return 0;
    }
  };

  const dadosOrdenados = [...data].sort(ordenarDados);

  const dadosFiltrados = dadosOrdenados.filter((charge) => {
    return (
      charge.client_name
        .toLowerCase()
        .includes(consultaPesquisa.toLowerCase()) ||
      charge.id_pt.includes(consultaPesquisa)
    );
  });

  function handleConfirmDelete(charge) {
    localStorage.setItem("currentCharge", charge);
    setChargeDeleteConfirmEditOpened(true);
  }

  function handleEditCharge(charge) {
    localStorage.setItem("currentCharge", charge);
    setEditChargesOpened(true);
  }

  function handleOpenChargeInfo(charge) {
    localStorage.setItem("currentCharge", JSON.stringify(charge));
    setChargeInfoOpened(true);
  }

  return (
    <div className="TableCharge">
      <div className="TableChargeHead">
        <div>
          <img
            src={frameIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOrdenacao("cliente");
              toggleOrdenacao("cliente");
            }}
          />
          <h1>Cliente</h1>
        </div>
        <div>
          <img
            src={frameIcon}
            alt=""
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOrdenacao("idCobranca");
              toggleOrdenacao("idCobranca");
            }}
          />
          <h1>ID Cob.</h1>
        </div>
        <h1>Valor</h1>
        <h1>Data de venc.</h1>
        <h1>Status</h1>
        <h1>Descrição</h1>
      </div>

      <div className="dividerHorizontal"></div>
      {isLoading ? (
        <Box className="loading">
          <CircularProgress style={{ color: 'var(--principal-rosa)' }} />
        </Box>
      ) : dadosFiltrados.length === 0 ? (
        <div>
          <img src={errorIcon} alt="Erro" className="error-icon" />
        </div>
      ) : (dadosFiltrados.map((charge) => (
        <>
          <div className="TablechargeList" key={charge.id} >
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenChargeInfo(charge)}>
              <p className="divFont" >{charge.client_name}</p>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenChargeInfo(charge)}>
              <p className="divFont">{charge.id_pt}</p>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenChargeInfo(charge)}>
              <p className="divFont">{charge.amount_pt}</p>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenChargeInfo(charge)}>
              <p className="divFont">{charge.due_date_pt}</p>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenChargeInfo(charge)}>
              <p className={charge.status_pt}>{charge.status_pt}</p>
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => handleOpenChargeInfo(charge)}>
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
      )))}
    </div>
  );
}
