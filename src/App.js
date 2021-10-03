import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navbar from "components/Navbar";
import Login from "components/Login";
import Home from "pages/Home";
import styled from "styled-components";
import ClassSched from "pages/ClassSchedule";
import Calendar from "pages/Calendar";
import Logout from "components/Logout";
import Course from "pages/Course";
import AllCourses from "pages/AllCourses";
import AllGroups from "pages/AllGroups";
import Group from "pages/Group";
import Settings from "pages/Settings";
import ResetPassword from "pages/ResetPassword";
import ForgotPassword from "pages/ForgotPassword";
import Admin from "pages/Admin";
import { useCurrentUserContext } from "contexts/CurrentUserContext";

function App() {
  const { user } = useCurrentUserContext();
  const isAdmin = user?.isAdmin;

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
          <Route path="/reset-password/:token">
            <ResetPassword />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
          <>
            <Navbar />
            <Switch>
              {isAdmin && (
                <Switch>
                  <Route path="/admin">
                    <Admin />
                  </Route>
                  <Redirect from="/" to="/admin" />
                </Switch>
              )}
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
              <Route path="/classes">
                <AllCourses />
              </Route>
              <Route path="/class/:id">
                <Course />
              </Route>
              <Route path="/groups">
                <AllGroups />
              </Route>
              <Route path="/group/:id">
                <Group />
              </Route>
              <Route path="/settings">
                <Settings />
              </Route>
              <Redirect from="/" exact to="/" />
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
