import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";

const Main = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.black};
  flex: 1;

  & > h1 {
    color: ${({ theme }) => theme.colors.primaryTextColor};
    margin-top: 0;
  }
`;

const Chat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: calc(100% - 58px);
`;

const Chatbox = styled.div`
  color: ${({ theme }) => theme.colors.primaryTextColor};
  display: flex;
  height: 48px;
  margin-bottom: 10px;
  align-items: center;

  .name {
    font-weight: bold;
    font-size: 18px;
    font-style: italic;
  }

  .message {
    font-size: 16px;
  }

  .timestamp {
    margin-left: 10px;
    font-size: 12px;
  }
`;

const Image = styled.div`
  height: 48px;
  width: 48px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  margin-right: 10px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatInput = styled.input`
  height: 48px;
  border-radius: 8px;
  width: 100%;
  padding: 10px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  background-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.white};
`;

const Channel = () => {
  const { id } = useParams();
  const chats = [
    {
      user: "User1",
      message: "Hello world",
      isCurrentUser: true,
      timestamp: 1600142039783,
    },
    {
      user: "User1",
      message: "Hello world",
      isCurrentUser: true,
      timestamp: 1600242039783,
    },
    {
      user: "User2",
      message: "Hello world",
      isCurrentUser: false,
      timestamp: 1600342039783,
    },
    {
      user: "User1",
      message: "Hello world",
      isCurrentUser: true,
      timestamp: 1600842039783,
    },
  ];

  return (
    <Main>
      <h1>Channel {id}</h1>
      <Chat>
        {chats.map((chat) => {
          return (
            <Chatbox key={chat.timestamp}>
              <Image />
              <Content>
                <span className="name">
                  {chat.user}
                  <span className="timestamp">
                    {dayjs(chat.timestamp).format("hh:mm - DD/MMM/YYYY")}
                  </span>
                </span>
                <span className="message">{chat.message}</span>
              </Content>
            </Chatbox>
          );
        })}
        <ChatInput placeholder="Write your message here..." />
      </Chat>
    </Main>
  );
};

export default Channel;
