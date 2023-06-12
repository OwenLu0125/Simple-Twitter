import './AuthInput.scss';

const AuthInput = ({ type, label, value, placeholder, onChange }) => {
  return (
    <div className="authContainer">
      <div className="label">{label}</div>
      <input
        className="input"
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
};

export default AuthInput;
