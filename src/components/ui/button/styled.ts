import styled, { keyframes } from "styled-components";
import btnCloseImg from "@images/common/btn-close.png";

export const TestButton = styled.button`
  width: 70px;
  height: 35px;
  margin: 3px;
  border: 1px #ccc solid;
  background-color: #ccc;
  font-size: 16px;
  color: ${(props) => props.color || "red"};
`;
export const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 16px;
  height: 16px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background: url(${btnCloseImg}) no-repeat right center;
  font-size: 20px;

  &:hover {
    cursor: pointer;
  }
`;
export const SubMenuDiv = styled.div`
  width: 100%;
  border: 1px #ccc solid;
  padding: 10px 0;
  background: #efefef;
  position: absolute;
  left: 0;
  top: 100px;
`;
