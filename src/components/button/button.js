import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  &.reserve {
    background-color: black;
    color: white;
    border: none;
    border-radius: 50px;
    box-shadow: rgba(0, 0, 0, 0.75) 0px 7px 15px;
  }
  &.icon {
    background-image: url(${({ icon }) => icon});
    border: none;
    width: 40px;
    height: 40px;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 130%;
    background-color: transparent;
  }
`;

export default Button;
