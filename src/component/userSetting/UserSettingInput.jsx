import "./UserSettingInput.scss";

const UserSettingInput = ({
  type,
  label,
  name,
  value,
  placeholder,
  onChange,
}) => {
  return (
    <div
      className={`authContainer`}
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

export default UserSettingInput;
