import React from 'react';

const Button = ({ onClick, label, style, ...props }) => {
  return (
    <button onClick={onClick} style={style} {...props}>
      {label}
    </button>
  );
};

export default Button;
