import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const Main = styled.div`
  height: 100%;
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
`;

const CustomLink = styled(Link)`
  text-decoration: none;
  margin: 5px 0;
  color: ${({ theme }) => theme.colors.secondaryTextColor};
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
  return (
    <Main>
      <Channels>
        {links.map(({ name, link, unreadMsgCount }) => {
          return (
            <li className={location.pathname === link ? "current" : ""}>
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
      </Channels>
    </Main>
  );
};

export default Sidebar;
