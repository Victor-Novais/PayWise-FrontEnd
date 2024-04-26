import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import AmountBalloon from "../../components/AmountBalloon";
import SummaryTableCharge from "../../components/SummaryTableCharge";
import SummaryTableClient from "../../components/SummaryTableClient";
import { api } from "../../services/api";
import "./home.css";

export default function Home() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    pastDueCharges: {
      total: 0,
      count: 0,
      charges: [],
    },
    expectedCharges: {
      total: 0,
      count: 0,
      charges: [],
    },
    paidCharges: {
      total: 0,
      count: 0,
      charges: [],
    },
    defaulterClients: {
      count: 0,
      clients: [],
    },
    onTimeClients: {
      count: 0,
      clients: [],
    },
  });

  async function fetchData() {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setData(response.data);
    } catch (error) {
      if (error.response.data.message === "Não autorizado") {
        localStorage.clear();
        navigate("/");
      }
      enqueueSnackbar("Sua sessão expirou", { variant: "error" });
    }
  }

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="home">
      <AmountBalloon
        status="paid"
        title="Cobranças Pagas"
        total={data.paidCharges?.total ?? 0}
      />
      <AmountBalloon
        status="overdue"
        title="Cobranças Vencidas"
        total={data.pastDueCharges?.total ?? 0}
      />
      <AmountBalloon
        status="pending"
        title="Cobranças Previstas"
        total={data.expectedCharges?.total ?? 0}
      />
      <SummaryTableCharge
        status="paid"
        title="Cobranças Pagas"
        data={data.paidCharges}
        linkTo="/charges?status=paid"
      />
      <SummaryTableCharge
        status="overdue"
        title="Cobranças Vencidas"
        data={data.pastDueCharges}
        linkTo="/charges?status=overdue"
      />
      <SummaryTableCharge
        status="pending"
        title="Cobranças Previstas"
        data={data.expectedCharges}
        linkTo="/charges?status=pending"
      />
      <SummaryTableClient
        status="overdue"
        title="Clientes Inadimplentes"
        data={data.defaulterClients}
        linkTo="/clients?defaulter=true"
      />
      <SummaryTableClient
        status="paid"
        title="Clientes em dia"
        data={data.onTimeClients}
        linkTo="/clients?defaulter=false"
      />
    </div>
  );
}
