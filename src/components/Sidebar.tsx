import React, { useContext } from "react";
import styled from "styled-components";
import { Link, useLocation, useParams } from "react-router-dom";

import { DataContext } from '../App';

const Main = styled.div`
  height: calc(100% - 40px);
  width: 20%;
  background-color: ${({ theme }) => theme.colors.primaryColor};
`;

const Channels = styled.ul`
  padding: 10px;
  list-style-type: none;

  & > li {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  h1 {
    color: ${({ theme }) => theme.colors.primaryTextColor};
  }
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.primaryTextColor};
  font-weight: normal;

  &.current {
    font-weight: bold;
    font-style: italic;
  }
`;

const UnreadCount = styled.div`
  border-radius: 15px;
  padding: 2px 4px;
  height: 20px;
  width: 30px;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-weight: bold;
  font-size: 14px;
`;

const AddThread = styled.button`
  width: 90%;
  margin: 30px auto;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.white};
  background: none;
`;

const Sidebar: React.FC<{}> = () => {
  const location = useLocation();
  const links = [
    {
      name: "Channel 1",
      link: "/channel/1",
    },
    {
      name: "Channel 2",
      link: "/channel/2",
      unreadMsgCount: 4,
    },
  ];
  const { id: threadId } = useParams<{ id: any }>();
  const dataContext = useContext(DataContext);
  const threads = dataContext.data.threads;
  const { openThreadEditor } = dataContext;

  return (
    <Main>
      <Channels>
        <h1> Chat Rooms </h1>
        {links.map(({ name, link, unreadMsgCount }) => {
          return (
            <li key={link} className={location.pathname === link ? "current" : ""}>
              <CustomLink
                to={link}
                className={location.pathname === link ? "current" : ""}
              >
                {name}
              </CustomLink>
              {unreadMsgCount && unreadMsgCount > 0 && (
                <UnreadCount>
                  {unreadMsgCount > 10 ? "9+" : unreadMsgCount}
                </UnreadCount>
              )}
            </li>
          );
        })}
        <h1> Threads </h1>
        {threads.map(({ name, id, isPaid }) => {
          return (
            <li key={id} className={threadId == id ? "current" : ""}>
              <CustomLink
                to={`/thread/${id}`}
                className={threadId == id ? "current" : ""}
              >
                {name} {isPaid ? '🔥' : ''}
              </CustomLink>
            </li>
          );
        })}
        <AddThread onClick={() => openThreadEditor()}>+ Add a Thread</AddThread>
      </Channels>
    </Main>
  );
};

export default Sidebar;
