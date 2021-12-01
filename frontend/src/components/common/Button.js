import React from "react";

const Button = ({ text, onClick, style }) => {
  return (
    <div className="button">
      <button style={style} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
// (e) => onChange(e.currentTarget.value)
