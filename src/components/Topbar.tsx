import React from "react";
import styled from "styled-components";

const Main = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  height: 40px;
  width: 100%;
`;

const User = styled.div`
  width: 20%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  font-weight: bold;
  display: flex;
  align-items: center;

  & > .online {
    height: 10px;
    width: 10px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.green};
    margin-left: 10px;
  }
`;

const Topbar: React.FC<{}> = () => {
  return (
    <Main>
      <User>
        <span className="name">Jane Doe</span>
        <div className="online" />
      </User>
    </Main>
  );
};

export default Topbar;
