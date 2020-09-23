import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";

const Main = styled.span`
  color: inherit;
  margin-left: 10px;
  font-size: 12px;
`;

const Timestamp: React.FC<{ timestamp: number; className?: string }> = ({
  timestamp,
  className,
}) => {
  return (
    <Main className={className}>
      {dayjs(timestamp).format("hh:mm - DD/MMM/YYYY")}
    </Main>
  );
};

export default Timestamp;
