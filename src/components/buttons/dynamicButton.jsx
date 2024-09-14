import styled from "styled-components";
import { Link } from "react-router-dom";
const DynamicButton = ({ to, text, appereance, ...rest }) => {
  return (
    <Link to={to} className="button" appereance={appereance || 'filled'}>
      <div className="btn" {...rest}>{text}</div>
    </Link>
  );
};
export default DynamicButton;
