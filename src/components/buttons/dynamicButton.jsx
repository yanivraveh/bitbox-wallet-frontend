import styled from "styled-components";
import { Link } from "react-router-dom";
export const Button = styled.button`
  border-radius: 0.6rem;
  border: none;
  width: 20rem;
  height: 3.5rem;
  cursor: pointer;
  background-color: ${({ bg }) => bg || "#50924E"};
  bottom: 2rem;
  color: #fff;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${({ hoverbg }) => hoverbg || "#396d37"};
  }
`;
const DynamicButton = ({ to, text, ...rest }) => {
  return (
    <Link to={to}>
      <Button {...rest}>{text}</Button>
    </Link>
  );
};
export default DynamicButton;
