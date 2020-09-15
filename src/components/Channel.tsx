import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Main = styled.div`
  padding: 10px;

  & > h1 {
    margin-top: 0;
  }
`;

const Channel = () => {
  const { id } = useParams();

  return (
    <Main>
      <h1>Channel {id}</h1>
    </Main>
  );
};

export default Channel;
