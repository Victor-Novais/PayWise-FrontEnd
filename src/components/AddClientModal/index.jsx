import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import { api } from "../../services/api";
import FormInput from "../FormInput";
import clientIcon from "../../assets/clients-icon.svg";
import useModalContext from "../../hooks/useModalContext";
import "./AddClientModal.css";

export default function AddClientModal() {
  const ref = useRef();

  const { modalAddClientOpened, setAddClientOpened } = useModalContext();

  const [values, setValues] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    street: "",
    complement: "",
    zipcode: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Digite seu nome",
      errorMessage: "Nome é obrigatório!",
      label: "Nome*",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Digite seu e-mail",
      errorMessage: "Obrigatório um e-mail válido!",
      label: "E-mail*",
      required: true,
    },
    {
      id: 3,
      name: "cpf",
      type: "text",
      placeholder: "Digite seu CPF",
      errorMessage: "",
      label: "CPF*",
      required: false,
      customClass: "small",
    },
    {
      id: 4,
      name: "phone",
      type: "text",
      placeholder: "Digite seu telefone",
      errorMessage: "",
      label: "Telefone",
      customClass: "small",
    },
    {
      id: 5,
      name: "street",
      type: "text",
      placeholder: "Digite o endereço",
      label: "Endereço",
    },
    {
      id: 6,
      name: "complement",
      type: "text",
      placeholder: "Digite o complemento",
      label: "Complemento",
    },
    {
      id: 7,
      name: "zipcode",
      type: "number",
      placeholder: "Digite o CEP",
      label: "CEP",
      customClass: "small",
    },
    {
      id: 8,
      name: "neighborhood",
      type: "text",
      placeholder: "Digite o bairro",
      label: "Bairro*",
      customClass: "small",
    },
    {
      id: 9,
      name: "city",
      type: "text",
      placeholder: "Digite a cidade",
      label: "Cidade",
      customClass: "big",
    },
    {
      id: 10,
      name: "state",
      type: "text",
      placeholder: "Digite a UF",
      label: "UF",
      customClass: "verySmall",
    },
  ];

  useEffect(() => {
    if (modalAddClientOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [modalAddClientOpened]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post(
        "/clients",
        {
          name: values.name,
          email: values.email,
          cpf: values.cpf,
          phone: values.phone,
          zipcode: values.zipcode,
          street: values.street,
          complement: values.complement,
          neighborhood: values.neighborhood,
          city: values.city,
          state: values.state,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 201) {
        enqueueSnackbar(response.data.message, { variant: "success" });
      }
    } catch (error) {
      const errorMessage = JSON.parse(error.request.responseText).message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  return (
    <>
      {modalAddClientOpened && (
        <dialog onClose={setAddClientOpened} ref={ref}>
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
            onClick={() => { setAddClientOpened(false); window.location.reload(); }}
          />
          <form className="formAddClientModal" onSubmit={handleSubmit}>
            <div className="AddClientModalHeader">
              <img src={clientIcon} alt="" />
              <h3>Cadastro do Cliente</h3>
            </div>

            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            <button>Aplicar</button>
          </form>
        </dialog>
      )}
    </>
  );
}
