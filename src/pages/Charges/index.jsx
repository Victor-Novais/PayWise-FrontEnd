import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import FiltersIcon from "../../assets/filters-icon.svg";
import DeleteChargeConfirmModal from "../../components/DeleteChargeConfirmModal";
import EditChargesModal from "../../components/EditChargesModal";
import SearchInput from "../../components/SearchInput";
import SubHeader from "../../components/SubHeader";
import TableCharge from "../../components/TableCharges";
import { api } from "../../services/api";
import "./charges.css";
import ChargeInfo from "../../components/ChargeInfo";

export default function Charges() {
  const [data, setdata] = useState([]);
  const [consultaPesquisa, setConsultaPesquisa] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchCharges = async () => {
      const status = searchParams.get("status");
      const token = localStorage.getItem("token");
      let endPoint = "/charges";

      if (status !== null) endPoint += `?status=${status}`;

      try {
        const response = await api.get(endPoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setdata(response.data.charges);
      } catch (error) {
        console.error("Erro ao buscar os dados da API:", error);
      }
    };

    fetchCharges();
  }, []);

  return (
    <>
      <SubHeader title="Cobranças">
        <img className="filtersImage" src={FiltersIcon} alt="filtros" />
        <SearchInput setConsultaPesquisa={setConsultaPesquisa} />
      </SubHeader>
      <TableCharge data={data} consultaPesquisa={consultaPesquisa} />
      <EditChargesModal />
      <DeleteChargeConfirmModal />
      <ChargeInfo />
    </>
  );
}
