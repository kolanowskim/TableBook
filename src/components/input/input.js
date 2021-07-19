import React from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: 130px;
  text-align: center;
  height: 20px;
  border: none;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.75) 0px 7px 15px;
`;

const Input = ({ type, name, ...props }) => (
  <StyledInput type={type} name={name} id={name} {...props} />
);

export default Input;
