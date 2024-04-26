import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import { api } from "../../services/api";
import FormInput from "../FormInput";
import chargeIcon from "../../assets/charge-icon.svg";
import useModalContext from "../../hooks/useModalContext";
import "./AddChargesModal.css";

export default function AddChargesModal() {
  const ref = useRef();

  const { modalAddChargesOpened, setAddChargesOpened } = useModalContext();

  const [values, setValues] = useState({
    client_id: "",
    name: "",
    description: "",
    status: "",
    amount: "",
    due_date: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Nome",
      errorMessage: "",
      label: "Nome*",
      disabled: true,
    },
    {
      id: 2,
      name: "description",
      type: "text",
      errorMessage: "Descrição é obrigatório!",
      label: "Descrição*",
      customClass: "veryBig",
      required: true,
    },
    {
      id: 3,
      name: "due_date",
      type: "date",
      placeholder: "Data de Vencimento",
      errorMessage: "Data de Vencimento é obrigatório!",
      customClass: "small",
      label: "Vencimento:*",
      required: true,
    },
    {
      id: 4,
      name: "amount",
      type: "number",
      placeholder: "Valor",
      errorMessage: "Valor é obrigatório!",
      customClass: "small",
      label: "Valor*",
      required: true,
    },
  ];

  useEffect(() => {
    if (modalAddChargesOpened) {
      ref.current?.showModal();
      const client = JSON.parse(localStorage.getItem("currentClient"));
      setValues({
        ...values,
        status: "paid",
        client_id: client.id,
        name: client.name,
      });
    } else {
      ref.current?.close();
      localStorage.removeItem("currentClient");
    }
  }, [modalAddChargesOpened]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/charges",
        {
          client_id: values.client_id,
          description: values.description,
          status: values.status,
          amount: values.amount * 100,
          due_date: values.due_date,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        enqueueSnackbar("Cobrança cadastrada com sucesso", {
          variant: "success",
        });
      }
    } catch (error) {
      console.log(error);
      const errorMessage = JSON.parse(error.request.responseText).message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  function handleRadioChange(e) {
    setValues({ ...values, status: e.target.value });
  }

  return (
    <>
      {modalAddChargesOpened && (
        <dialog onClose={setAddChargesOpened} ref={ref}>
          <SnackbarProvider
            autoHideDuration={7000}
            preventDuplicate={true}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            style={{ zIndex: 1000 }}
          ></SnackbarProvider>
          <img
            src={CloseIcon}
            alt="close"
            onClick={() => {
              setAddChargesOpened(false);
              window.location.reload();
            }}
          />
          <form className="formAddChargeModal" onSubmit={handleSubmit}>
            <div className="AddChargeModalHeader">
              <img src={chargeIcon} alt="" />
              <h3>Cadastro de Cobrança</h3>
            </div>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <div className="labelContainer">
              <label className="labelText">Status*</label>
              <div className="input-radio">
                <input
                  type="radio"
                  name="status"
                  value="paid"
                  onChange={handleRadioChange}
                />{" "}
                <label>Cobrança Paga</label>
              </div>
              <div className="input-radio">
                <input
                  type="radio"
                  name="status"
                  value="pending"
                  onChange={handleRadioChange}
                />{" "}
                <label>Cobrança Pendente</label>
              </div>
            </div>
            <div className="box-btns ">
              <button
                type="button"
                className="btn-cancel"
                onClick={() => setAddChargesOpened(false)}
              >
                Cancelar
              </button>
              <button className="btn-aplicar" style={{ width: "350px" }}>
                Aplicar
              </button>
            </div>
          </form>
        </dialog>
      )}
    </>
  );
}
