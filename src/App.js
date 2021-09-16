import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./pages/Home";
import styled from "styled-components";
import ClassSched from "./pages/ClassSchedule";
import Calendar from "./pages/Calendar";
import Logout from "components/Logout";

function App() {
  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/login" exact>
            <Login />
          </Route>
          <Route path="/logout" exact>
            <Logout />
          </Route>
          <>
            <Navbar />
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/class-schedule">
                <ClassSched />
              </Route>
              <Route path="/calendar">
                <Calendar />
              </Route>
              <Route path="/progress"></Route>
            </Switch>
          </>
        </Switch>
      </Router>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 0 auto;
`;

export default App;
