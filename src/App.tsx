import React, { useReducer } from "react";
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

type Post = {
  title?: string,
  content: string,
  user: string,
  timestamp: number,
  replies: Array<number>
}

export type Thread = {
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

type Action =
  | { type: 'SHOW_EDITOR', isReply: boolean, parentId?: number, threadId?: number }
  | { type: 'HIDE_EDITOR' }
  | { type: 'ADD_POST' };

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
      const currentThread = newThreads[state.threadId - 1];
      currentThread.posts.push({
        id: currentThread.nextPostId,
        ...post,
      });

      currentThread.posts[state.parentId].replies.push(currentThread.nextPostId);
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
    default:
      return state;
  }
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const openPostEditor = (isReply: boolean, parentId: number, threadId: number) => {
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

  const addThread = (thread: Thread) => {
    dispatch({
      type: 'ADD_THREAD',
      ...thread,
    });
    dispatch({
      type: 'HIDE_THREAD_EDITOR',
    });
  }

  return (
    <DataContext.Provider value={{ data: state, openPostEditor, openThreadEditor }}>
      <ThemeProvider theme={theme}>
        <Router>
          <Main>
            <Topbar />
            <Sidebar />
            <Switch>
              <Route path="/channel/:id" component={Channel} />
              <Route path="/thread/:id" component={Threads} />
            </Switch>
          </Main>
          <AddPost open={state.showPostEditor} onClose={() => dispatch({ type: 'HIDE_EDITOR' })} />
          {
            state.showThreadEditor && <AddThread open={state.showThreadEditor} onClose={() => dispatch({ type: 'HIDE_THREAD_EDITOR' })} onSubmit={addThread} />
          }
        </Router>
      </ThemeProvider>
    </DataContext.Provider>
  );
};

export default App;
