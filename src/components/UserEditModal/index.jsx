import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import CloseIcon from "../../assets/close-icon.svg";
import { api, checkEmailExists } from "../../services/api";
import FormInput from "../../components/FormInput";
import useModalContext from "../../hooks/useModalContext";
import SuccessIcon from "../../assets/sucess-icon.svg";
import "./userEditModal.css";

export default function UserEditModal() {
  const ref = useRef();

  const {
    modalUserEditOpened,
    setUserEditOpened,
    onEdiUserSuccess,
    setOnEditUserSuccess,
  } = useModalContext();

  const [values, setValues] = useState({
    username: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Digite seu nome",
      errorMessage: "Nome é obrigatório!",
      label: "Nome",
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Digite seu e-mail",
      errorMessage: "Obrigatório um e-mail válido!",
      label: "E-mail",
    },
    {
      id: 3,
      name: "cpf",
      type: "text",
      placeholder: "Digite seu CPF",
      errorMessage: "",
      label: "CPF",
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
      required: false,
      customClass: "small",
    },
    {
      id: 5,
      name: "password",
      type: "password",
      placeholder: "Digite sua senha",
      errorMessage: "Senha obrigatória",
      label: "Senha",
      enableShowPassword: true,
    },
    {
      id: 6,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirme sua senha",
      errorMessage: "As senhas não coincidem!",
      label: "Repita a senha",
      pattern: values.password,
      enableShowPassword: true,
    },
  ];

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setValues({
      username: user.username,
      email: user.email,
      cpf: user.cpf,
      phone: user.phone,
    });
  }, []);

  useEffect(() => {
    if (modalUserEditOpened) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [modalUserEditOpened]);

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (values.email !== JSON.parse(localStorage.getItem("user")).email) {
        const emailExists = await checkEmailExists({ email: values.email });
        if (emailExists) {
          enqueueSnackbar("Email já está cadastrado", { variant: "error" });
          return;
        }
      }

      const response = await api.patch(
        "/users",
        {
          username: values.username,
          email: values.email,
          cpf: values.cpf ?? "",
          phone: values.phone ?? "",
          password: values.password ?? "",
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setOnEditUserSuccess(true);
      }
    } catch (error) {
      const errorMessage = JSON.parse(error.request.responseText).message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  function handleClose() {
    setUserEditOpened(false);
    setOnEditUserSuccess(false);
  }

  return (
    <>
      {modalUserEditOpened && (
        <dialog onClose={handleClose} ref={ref}>
          <SnackbarProvider
            autoHideDuration={7000}
            preventDuplicate={true}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }} style={{ zIndex: 1000 }}
          ></SnackbarProvider>
          <img src={CloseIcon} alt="close" onClick={handleClose} />
          {onEdiUserSuccess ? (
            <div className="userEditModalSucess">
              <img src={SuccessIcon} alt="sucesso" />
              <h3>Cadastro alterado com sucesso!</h3>
            </div>
          ) : (
            <form className="formUserEditModal" onSubmit={handleSubmit}>
              <h3>Edite seu cadastro</h3>
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
          )}
        </dialog>
      )}
    </>
  );
}
