import React from "react";
import styled from "styled-components";
//delete later
// import Button from '@material-ui/core/Button';

const Main = styled.div`
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  height: 40px;
  width: 100%;
  display: flex;
  justify-content: space-between;
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

//rename, something like 'boost'
const FundButton = styled.div`
  padding: 10px;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  font-weight: bold;
  display: flex;
  align-items: center;

  button {
    border: 1px solid ${({ theme }) => theme.colors.borderGrey};
    color: ${({ theme }) => theme.colors.white};
    padding: 10px;
    background-color: transparent;
    margin: 0 10px;
  }
`;

const Topbar: React.FC<{}> = () => {
  return (
    <Main>
      <User>
        <span className="name">Jane Doe</span>
        <div className="online" />
      </User>
      <FundButton>
        <button>Fork Community</button>
        <button>Boost This Server!</button>
      </FundButton>
    </Main>
  );
};

export default Topbar;
