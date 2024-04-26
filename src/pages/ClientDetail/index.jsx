import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddChargesModal from "../../components/AddChargesModal";
import AddClientModal from "../../components/AddClientModal";
import DeleteChargeConfirmModal from "../../components/DeleteChargeConfirmModal";
import EditChargesModal from "../../components/EditChargesModal";
import EditClientModal from "../../components/EditClientModal";
import Inform from "../../components/Information";
import { api } from "../../services/api";
import "./clientDetail.css";

export default function ClientDetail() {
  const { clientId } = useParams();

  const [data, setData] = useState({});

  async function getDetails(client_id) {
    try {
      const response = await api.get(`/client/${client_id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setData(response.data);
    } catch (error) {
      enqueueSnackbar(error.response.data.message, { variant: "error" });
    }
  }

  useEffect(() => {
    getDetails(clientId);
  }, [clientId]);

  return (
    <>
      <div className="mycontainer">
        <div>
          <Inform data={data} />
        </div>
      </div>
      <AddClientModal />
      <AddChargesModal />
      <EditChargesModal />
      <EditClientModal clientData={data.existingClient} />
      <DeleteChargeConfirmModal />
    </>
  );
}
