import { useState } from "react";
import { Link } from "react-router-dom";
import eyeClosed from "../../assets/eye-closed.svg";
import eyeOpened from "../../assets/eye-opened.svg";
import "./formInput.css";

export default function FormInput({
  id,
  type,
  label,
  onChange,
  errorMessage,
  forgotPassword,
  enableShowPassword,
  customClass,
  ...inputProps
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [focused, setFocused] = useState(false);
  const handleFocus = (e) => setFocused(true);

  return (
    <div className={`formInput ${customClass}`}>
      <label>{label}</label>
      {forgotPassword && (
        <span className="forgotPassword">
          <Link to="#">Esqueceu a senha?</Link>
        </span>
      )}
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
        type={enableShowPassword && showPassword ? "text" : type}
      />
      {enableShowPassword && (
        <img
          src={showPassword ? eyeOpened : eyeClosed}
          alt="exibir a senha"
          onClick={() => setShowPassword(!showPassword)}
        />
      )}
      <span className="error">{errorMessage}</span>
    </div>
  );
}
