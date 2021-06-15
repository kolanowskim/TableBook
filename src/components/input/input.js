import React from "react";

const Input = ({ type, name, ...props }) => (
  <input type={type} name={name} id={name} {...props} />
);

export default Input;
