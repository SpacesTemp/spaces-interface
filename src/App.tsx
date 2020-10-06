import React, { useReducer } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import theme from "./theme";
import Sidebar from "./components/Sidebar";
import Channel from "./components/Channel";
import Threads from "./components/Threads";
import Topbar from "./components/Topbar";
import AddPost from './components/AddPost';
import mockData from './mockData/threads.json';

type Post = {
  title?: string,
  content: string,
  user: string,
  timestamp: number,
  replies: Array<number>
}

type Thread = {
  id: number,
  name: string,
  isPaid: boolean,
  payAmount: number,
  posts: Array<Post>,
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

const DataContext = React.createContext({
  data: mockData,
  openEditor: (isReply: boolean, parentId: number, threadId: number) => { }
});

const initialState = {
  threads: mockData.threads,
  showPostEditor: false,
  editorMeta: {
    isReply: false,
    parentId: null,
    threadId: null,
  },
  nextAvailableId: mockData.nextId,
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
      }
  }
  return state;
}

const App = () => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const openEditor = (isReply: boolean, parentId: number, threadId: number) => {
    dispatch({
      type: 'SHOW_EDITOR',
      isReply,
      parentId,
      threadId
    });
  }

  return (
    <DataContext.Provider value={{ data: state.threads, openEditor }}>
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
          <AddPost open={state.showPostEditor} onClose={() => dispatch({ type: 'HIDE_EDITOR' })} onSubmit={() => { }} />
        </Router>
      </ThemeProvider>
    </DataContext.Provider>
  );
};

export default App;
