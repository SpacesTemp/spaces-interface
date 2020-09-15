import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";

import theme from "./theme";
import Sidebar from "./components/Sidebar";
import Channel from "./components/Channel";
import Topbar from "./components/Topbar";

const Main = styled.main`
  display: flex;
  height: 100%;
  width: 100%;
  flex-wrap: wrap;
`;

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Main>
          <Topbar />
          <Sidebar />
          <Switch>
            <Route path="/channel/:id" component={Channel} />
          </Switch>
        </Main>
      </Router>
    </ThemeProvider>
  );
};

export default App;
