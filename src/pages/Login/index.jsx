import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginLeft from "../../assets/login-left.png";
import FormInput from "../../components/FormInput";
import { api } from "../../services/api";
import "./login.css";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  });

  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Digite seu e-mail",
      errorMessage: "Obrigatório um e-mail válido!",
      label: "E-mail",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Digite sua senha",
      errorMessage: "Senha obrigatória",
      label: "Senha",
      forgotPassword: true,
      enableShowPassword: true,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/login", {
        email: values.email,
        password: values.password,
      });

      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);
        navigate("/home");
      }
    } catch (error) {
      const errorMessage = JSON.parse(error.request.responseText).message;
      enqueueSnackbar(errorMessage, { variant: "error" });
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-login">
      <div className="content-left">
        <img src={loginLeft} alt="Login" />
        <p>
          Gerencie todos os pagamentos
          <br />
          da sua empresa em um só
          <br />
          lugar.
        </p>
      </div>
      <div className="content-right">
        <form onSubmit={handleSubmit}>
          <h3>Faça seu login!</h3>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Entrar</button>
          <span>
            Ainda não possui uma conta? <Link to="/signup">Cadastre-se</Link>
          </span>
        </form>
      </div>
    </div>
  );
}
