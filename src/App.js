import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import Login from "components/Login";
import Home from "pages/Student/Home";
import ClassSched from "pages/Student/ClassSchedule/ScheduleContainer";
import Calendar from "pages/Student/Calendar";
import Logout from "components/Logout";
import Course from "pages/Student/Course";
import TCourse from "pages/Teacher/Course";
import AllCourses from "pages/Student/AllCourses";
import AllCourseGroups from "pages/Student/AllCourseGroups";
import AllStudyGroups from "pages/Student/AllStudyGroups";
import Group from "pages/Student/Group";
import Settings from "pages/Student/Settings";
import ResetPassword from "pages/ResetPassword";
import ForgotPassword from "pages/ForgotPassword";
import Admin from "pages/Admin";
import Progress from "pages/Student/Progress";
import THome from "pages/Teacher/THome";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import TeacherAllClass from "pages/Teacher/Classes";
import TeacherSchedule from "pages/Teacher/ClassSched";
import Activity from "pages/Student/Activity";
import TSettings from "pages/Teacher/TSettings";

function App() {
  const { user } = useCurrentUserContext();
  const isAdmin = user?.isAdmin;
  const teacher = user?.teacher;
  const student = user?.student;

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
              {student && (
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
                  <Route path="/progress">
                    <Progress />
                  </Route>
                  <Route path="/classes">
                    <AllCourses />
                  </Route>
                  <Route path="/class/:id">
                    <Course />
                  </Route>
                  <Route path="/classgroups">
                    <AllCourseGroups />
                  </Route>
                  <Route path="/studygroups">
                    <AllStudyGroups />
                  </Route>
                  <Route path="/group/:id">
                    <Group />
                  </Route>
                  <Route path="/settings">
                    <Settings />
                  </Route>
                  <Route path="/activity">
                    <Activity />
                  </Route>
                  <Redirect from="/" to="/" />
                </Switch>
              )}
              {teacher && (
                <>
                  <Sidebar />
                  <Switch>
                    <Route path="/" exact>
                      <THome />
                    </Route>
                    <Route path="/class/:id">
                      <TCourse />
                    </Route>
                    <Route path="/classes">
                      <TeacherAllClass />
                    </Route>

                    <Route path="/class-schedule">
                      <TeacherSchedule />
                    </Route>
                    <Route path="/settings">
                      <TSettings />
                    </Route>
                    <Redirect from="/" to="/" />
                  </Switch>
                </>
              )}
            </Switch>
          </>
        </Switch>
      </Router>
      <ToastContainer />
    </AppContainer>
  );
}

const AppContainer = styled.div`
  margin: 0 auto;
`;

export default App;
