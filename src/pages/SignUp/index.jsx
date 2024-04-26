import Stepper from "@keyvaluesystems/react-vertical-stepper";
import { enqueueSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoSuccess from "../../assets/logo-success.svg";
import FormInput from "../../components/FormInput";
import { api, checkEmailExists } from "../../services/api";
import { initialStepsArr } from "./constants";
import "./signUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const state = { button: 1 };

  useEffect(() => {
    if (localStorage.getItem("token")) navigate("/home");
  });

  const [currentStep, setCurrentStep] = useState(0);

  const [values, setValues] = useState({
    username: "",
    email: "",
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
      name: "password",
      type: "password",
      placeholder: "Digite sua senha",
      errorMessage: "Senha obrigatória",
      label: "Senha*",
      enableShowPassword: true,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirme sua senha",
      errorMessage: "As senhas não coincidem!",
      label: "Repita a senha*",
      pattern: values.password,
      enableShowPassword: true,
      required: true,
    },
  ];

  const handleStepClick = (step, index) => {
    if (currentStep === 2) return;

    if (index < currentStep) setCurrentStep(index);
  };

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state.button === 1) {
      const emailExists = await checkEmailExists({ email: values.email });
      if (emailExists) {
        enqueueSnackbar("Email já está cadastrado", { variant: "error" });
        return;
      }

      setCurrentStep(1);
      return;
    }

    if (state.button === 2) {
      const { confirmPassword: _, ...user } = values;

      api
        .post("/users", user)
        .then((response) => {
          enqueueSnackbar("Sucesso!", { variant: "success" });
        })
        .catch((error) => {
          enqueueSnackbar("Erro ao registrar usuário", { variant: "error" });
        });

      setCurrentStep(2);
      return;
    }
  };

  return (
    <div className="container-signup">
      <div className="content-left">
        <Stepper
          steps={initialStepsArr}
          currentStepIndex={currentStep}
          onStepClick={handleStepClick}
          labelPosition="right"
          styles={{
            LabelTitle: (step, stepIndex) => ({
              color: "var(--principal-verde)",
              fontWeight: "700",
              fontSize: 18,
            }),
            LabelDescription: (step, stepIndex) => ({
              color: "var(--cinza-2)",
              fontWeight: "600",
              fontSize: 17,
            }),
            Bubble: (step, stepIndex) => ({
              backgroundColor: "var(--principal-verde)",
            }),
            ActiveBubble: (step, stepIndex) => ({
              transform: "scale(1.07)",
            }),
            LineSeparator: (step, index) => ({
              height: "70px",
            }),
          }}
        />
      </div>
      <div className="content-right">
        <form onSubmit={handleSubmit}>
          {currentStep === 0 && (
            <>
              <div className="formSignUp">
                <h3>Adicione seus dados</h3>
                <FormInput
                  key={inputs[0].id}
                  {...inputs[0]}
                  value={values[inputs[0].name]}
                  onChange={onInputChange}
                />
                <FormInput
                  key={inputs[1].id}
                  {...inputs[1]}
                  value={values[inputs[1].name]}
                  onChange={onInputChange}
                />
                <button onClick={() => (state.button = 1)}>Continuar</button>
                <span>
                  Já possui uma conta? Faça seu <Link to="/">Login</Link>
                </span>
              </div>
              <div className="stepView">
                <span className="active" />
                <span />
                <span />
              </div>
            </>
          )}

          {currentStep === 1 && (
            <>
              <div className="formSignUp">
                <h3>Escolha uma senha</h3>
                <FormInput
                  key={inputs[2].id}
                  {...inputs[2]}
                  value={values[inputs[2].name]}
                  onChange={onInputChange}
                />
                <FormInput
                  key={inputs[3].id}
                  {...inputs[3]}
                  value={values[inputs[3].name]}
                  onChange={onInputChange}
                />
                <button onClick={() => (state.button = 2)}>Entrar</button>
                <span>
                  Já possui uma conta? Faça seu <Link to="/">Login</Link>
                </span>
              </div>
              <div className="stepView">
                <span />
                <span className="active" />
                <span />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="formSignUpSuccess">
                <img src={logoSuccess} alt="sucesso" />
                <h3>Cadastro realizado com sucesso!</h3>
              </div>
              <button type="button" onClick={() => navigate("/")}>
                Ir para Login
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
