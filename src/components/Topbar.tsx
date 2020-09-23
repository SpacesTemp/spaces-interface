import React from "react";
import styled from "styled-components";
//delete later
// import Button from '@material-ui/core/Button';

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

//rename, something like 'boost'
const FundButton = styled.div`
  width: 50%;
  padding: 10px;
  margin-top: 0px;
  margin-left: 1400px;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
  background-color: ${({ theme }) => theme.colors.primaryDarkColor};
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const Topbar: React.FC<{}> = () => {
  return (
    <Main>
      <User>
        <span className="name">Jane Doe</span>
        <div className="online" />
      </User>
      <FundButton>
        {/* <Button variant="outlined" >
          Fork Community
      </Button>
      <Button variant="outlined" >
          Boost This Server!
      </Button> */}
      </FundButton>
    </Main>
  );
};

export default Topbar;
