import "./AuthInput.scss";

const AuthInput = ({
  type,
  label,
  name,
  value,
  placeholder,
  onChange,
  accountError,
  passwordError,
  error,
}) => {
  return (
    <div
      className={`authContainer ${
        accountError || passwordError || error ? "error" : ""
      }`}
    >
      <div className="label">{label}</div>
      <input
        className="input"
        type={type || "text"}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default AuthInput;
