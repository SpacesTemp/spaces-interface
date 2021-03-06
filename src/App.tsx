import React, { useReducer, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import theme from "./theme";
import Sidebar from "./components/Sidebar";
import Channel from "./components/Channel";
import Threads from "./components/Threads";
import Topbar from "./components/Topbar";
import AddPost from './components/AddPost';
import AddThread from './components/AddThread';
import mockData from './mockData/threads.json';

export type Post = {
  id: number,
  title?: string,
  content: string,
  user: string,
  timestamp: number,
  replies: Array<number>
}

export type PostInput = {
  title?: string,
  content: string,
}

export type Thread = {
  id: number,
  name: string,
  isPaid: boolean,
  payAmount: number,
  posts: Array<Post>,
}

export type ThreadInput = {
  name: string,
  isPaid: boolean,
  payAmount: number,
}

interface State {
  threads: Array<Thread>,
  showPostEditor: boolean,
  editorMeta: {
    isReply: boolean,
    parentId: null | number,
    threadId: null | number,
  },
  nextAvailableId: number,
}

const Main = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
`;

export const DataContext = React.createContext({
  data: mockData,
  openPostEditor: (isReply: boolean, parentId: number, threadId: number) => { },
  openThreadEditor: () => { },
});

const initialState = {
  threads: mockData.threads,
  showPostEditor: false,
  showThreadEditor: false,
  editorMeta: {
    isReply: false,
    parentId: null,
    threadId: null,
  },
  nextThreadId: mockData.nextThreadId,
  communityPoints:0,
};

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case 'SHOW_EDITOR':
      return {
        ...state,
        showPostEditor: true,
        editorMeta: {
          isReply: action.isReply,
          parentId: action.parentId,
          threadId: action.threadId,
        }
      };
    case 'HIDE_EDITOR':
      return {
        ...state,
        showPostEditor: false,
        editorMeta: {
          isReply: null,
          parentId: null,
          threadId: null,
        }
      };
    case 'ADD_POST':
      const { post } = action;
      const newThreads = [...state.threads];
      const threadId = state.editorMeta.threadId;

      const currentThread = newThreads[threadId - 1];
      console.log(currentThread);
      currentThread.posts.push({
        id: currentThread.nextPostId,
        timestamp: Date.now(),
        replies: [],
        ...post,
      });

      if (state.editorMeta.isReply) {
        currentThread.posts[state.editorMeta.parentId - 1].replies.push(currentThread.nextPostId);
      }
      currentThread.nextPostId++;

      return {
        ...state,
        threads: newThreads,
      };
    case 'ADD_THREAD':
      const newState = { ...state };
      const newThreadState = [...state.threads];
      newThreadState.push({
        "id": state.nextThreadId,
        "name": action.name,
        "isPaid": action.isPaid,
        "payAmount": action.payAmount,
        "posts": [],
        nextPostId: 1,
      });

      newState.nextThreadId++;
      newState.threads = [...newThreadState];
      return {
        ...state,
        ...newState,
      }
    case 'SHOW_THREAD_EDITOR': {
      return {
        ...state,
        showThreadEditor: true,
      };
    }
    case 'HIDE_THREAD_EDITOR': {
      return {
        ...state,
        showThreadEditor: false,
      };
    }
    case 'ADD_COMMUNITY_POINTS': {
      console.log(state.communityPoints)
      return {
        ...state,
        communityPoints : state.communityPoints + action.communityPoints,
      };
    }
    case 'SUBTRACT_COMMUNITY_POINTS': {
      console.log(state.communityPoints)
      return {
        ...state,
        communityPoints : state.communityPoints - action.communityPoints,
      };
    }
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const openPostEditor = (isReply: boolean, parentId: number, threadId: number) => {
    console.log(isReply,
      parentId,
      threadId);
    dispatch({
      type: 'SHOW_EDITOR',
      isReply,
      parentId,
      threadId
    });
  }

  const openThreadEditor = () => {
    dispatch({
      type: 'SHOW_THREAD_EDITOR',
    });
  }

  const addThread = (thread: ThreadInput) => {
    dispatch({
      type: 'ADD_THREAD',
      ...thread,
    });
    dispatch({
      type: 'HIDE_THREAD_EDITOR',
    });
  }

  const addPost = (post: PostInput) => {
    dispatch({
      type: 'ADD_POST',
      post,
    });
    dispatch({
      type: 'HIDE_EDITOR',
    });
  }

  const addCommunityPoints = (communityPoints: number) =>{
    dispatch({
      type:  'ADD_COMMUNITY_POINTS',
      communityPoints,
    });
  }
  const subtractCommunityPoints = (communityPoints: number) =>{
    dispatch({
      type:  'SUBTRACT_COMMUNITY_POINTS',
      communityPoints,
    });
  }
  return (
    <DataContext.Provider value={{ data: state, openPostEditor, openThreadEditor }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Main>
            <Topbar communityPoints={state.communityPoints} addCommunityPoints={addCommunityPoints} />
            <Sidebar />
            <Switch>
              <Route path="/channel/:id" component={Channel} />
              <Route path="/thread/:id" component={Threads} />
            </Switch>
          </Main>
          <AddPost open={state.showPostEditor} onClose={() => dispatch({ type: 'HIDE_EDITOR' })} onSubmit={addPost} />
          {
            state.showThreadEditor && <AddThread open={state.showThreadEditor} onClose={() => dispatch({ type: 'HIDE_THREAD_EDITOR' })} onSubmit={addThread} communityPoints={state.communityPoints} subtractCommunityPoints={subtractCommunityPoints} />
          }
        </Router>
      </ThemeProvider>
    </DataContext.Provider>
  );
};

export default App;
