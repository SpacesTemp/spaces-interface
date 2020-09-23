import React, { useReducer } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Timestamp from "./Timestamp";

const Main = styled.div`
  padding: 10px;
  background-color: ${({ theme }) => theme.colors.black};
  flex: 1;
  height: 100%;

  & > h1 {
    color: ${({ theme }) => theme.colors.primaryTextColor};
    margin-top: 0;
  }
`;

const ChatDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: calc(100% - 58px);
  overflow: auto;
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

type Chat = {
  user: string;
  message: string;
  isCurrentUser: boolean;
  timestamp: any;
};

const chatReducer = (
  state: { chats: Array<Chat> },
  action: { type: string; message: Chat }
) => {
  console.log(action);
  const newState = { ...state };
  switch (action.type) {
    case "ADD_CHAT":
      newState.chats.push(action.message);
      return newState;
  }
  return state;
};

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

  const [state, dispatch] = useReducer(chatReducer, { chats });

  return (
    <Main>
      <h1>Channel {id}</h1>
      <ChatDiv>
        {state.chats.map((chat: Chat) => {
          return (
            <Chatbox key={chat.timestamp}>
              <Image />
              <Content>
                <span className="name">
                  {chat.user}
                  <Timestamp timestamp={chat.timestamp} />
                </span>
                <span className="message">{chat.message}</span>
              </Content>
            </Chatbox>
          );
        })}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            dispatch({
              type: "ADD_CHAT",
              message: {
                user: "User1",
                message: (e.target as HTMLFormElement).message.value,
                isCurrentUser: true,
                timestamp: Date.now(),
              },
            });
            (e.target as HTMLFormElement).reset();
          }}
        >
          <ChatInput
            name="message"
            type="text"
            placeholder="Write your message here..."
          />
        </form>
      </ChatDiv>
    </Main>
  );
};

export default Channel;
