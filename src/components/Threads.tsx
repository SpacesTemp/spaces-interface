import React, { useContext } from "react";
import { useParams, Redirect } from "react-router-dom";
import styled from "styled-components";

import { DataContext, Thread as ThreadType } from "../App";
import Post from "./Post";

const Main = styled.div`
  position: relative;
  padding: 10px;
  flex: 1;
  height: calc(100% - 40px);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
  align-items: flex-start;
  align-content: flex-start;

  & > h1 {
    margin-top: 0;
    width: 100%;
  }
`;

const NoPosts = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const AddPost = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black};
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.colors.black};
  padding: 10px 20px;
`;

export const ThreadContext = React.createContext<{ thread: ThreadType }>({
  thread: {
    id: 0,
    name: '',
    posts: [],
    isPaid: false,
    payAmount: 0.0,
  },
});

const Thread = () => {
  const dataContext = useContext(DataContext);
  const { id } = useParams<{ id: string }>();

  const currentThread = dataContext.data.threads[parseInt(id) - 1];
  if (!currentThread) {
    return <Redirect to="/" />
  }
  const { id: threadId, name, posts } = currentThread;

  return (
    <Main>
      <h1>{name}</h1>
      <ThreadContext.Provider value={{ thread: currentThread }}>
        {posts.length > 0 ? <Post post={posts[0]} /> :
          <NoPosts>
            <h3>No posts added yet.</h3>
            <AddPost onClick={() => dataContext.openPostEditor(false, 0, threadId)}>Add a Post</AddPost>
          </NoPosts>
        }
      </ThreadContext.Provider>
    </Main>
  );
};

export default Thread;
