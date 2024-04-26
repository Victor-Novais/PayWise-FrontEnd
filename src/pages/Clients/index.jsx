import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersIcon from "../../assets/filters-icon.svg";
import AddChargesModal from "../../components/AddChargesModal";
import AddClientModal from "../../components/AddClientModal";
import SearchInput from "../../components/SearchInput";
import SubHeader from "../../components/SubHeader";
import TableClient from "../../components/TableClient";
import useModalContext from "../../hooks/useModalContext";
import { api } from "../../services/api";
import "./clients.css";

export default function Clients() {
  const { setAddClientOpened } = useModalContext();
  const [consultaPesquisa, setConsultaPesquisa] = useState("");
  const [ordenacao, setOrdenacao] = useState(null);
  const [searchParams] = useSearchParams();

  const [data, setdata] = useState([]);
  const fetchClients = async () => {
    const defaulter = searchParams.get("defaulter");
    let endPoint = "/clients";

    if (defaulter !== null) endPoint += `?defaulter=${defaulter}`;

    try {
      const token = localStorage.getItem("token");
      const response = await api.get(endPoint, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setdata(response.data.clients);
    } catch (error) {
      console.error("Erro ao buscar a lista de clientes:", error);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <>
      <SubHeader title="Clientes">
        <button className="btn-add" onClick={() => setAddClientOpened(true)}>
          + Adicionar cliente
        </button>
        <img className="filtersImage" src={FiltersIcon} alt="filtros" />
        <SearchInput setConsultaPesquisa={setConsultaPesquisa} />
      </SubHeader>
      <TableClient
        data={data}
        consultaPesquisa={consultaPesquisa}
        ordenacao={ordenacao}
        setOrdenacao={setOrdenacao}
      />
      <AddClientModal />
      <AddChargesModal />
    </>
  );
}
