import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Switch, NavLink, Route, useParams } from "react-router-dom";
import { COURSE_FILES } from "../gql";
import { useQuery } from "@apollo/client";
import { formatBytes } from "utils/upload";

const Files = () => {
  const { classId } = useParams();

  const { loading, data } = useQuery(COURSE_FILES, {
    variables: { courseId: classId },
  });
  const postFiles = data?.courseFiles?.postFiles ?? [];
  const activityFiles = data?.courseFiles?.activityFiles ?? [];
  const groupActivityFiles = data?.courseFiles?.groupActivityFiles ?? [];

  return (
    <FileContainer>
      <NavBar>
        <NavMenu to={`/class/${classId}/files`} exact>
          Post Files
        </NavMenu>
        <NavMenu to={`/class/${classId}/files/activity`}>
          Activity Files
        </NavMenu>
        <NavMenu to={`/class/${classId}/files/groupactivity`}>
          Group Activity Files
        </NavMenu>
      </NavBar>
      <Switch>
        <Route path={`/class/:id/files`} exact>
          {loading
            ? "Loading..."
            : postFiles.map(({ id, attachment, user }) => {
                const { original_filename, secure_url, created_at, bytes } =
                  JSON.parse(attachment) ?? {};

                return (
                  <>
                    {attachment && (
                      <File key={id}>
                        <Attachment href={secure_url} download>
                          <h1
                            title={`${original_filename}.${secure_url
                              .split(".")
                              .slice(-1)}`}
                          >
                            {original_filename}.
                            {secure_url.split(".").slice(-1)}
                          </h1>
                        </Attachment>
                        <span>{formatBytes(bytes)}</span>
                        <span>
                          Uploaded by: {user.firstName} {user.lastName}
                        </span>
                        <p className="date">
                          {dayjs(created_at).format("MMMM D, YYYY [at] h:mm a")}
                        </p>
                      </File>
                    )}
                  </>
                );
              })}
        </Route>
        <Route path={`/class/:classId/files/activity`}>
          {loading
            ? "Loading..."
            : activityFiles.map(({ id, attachment }) => {
                const { original_filename, secure_url, created_at, bytes } =
                  JSON.parse(attachment) ?? {};

                return (
                  <>
                    {attachment && (
                      <File key={id}>
                        <Attachment href={secure_url} download>
                          <h1
                            title={`${original_filename}.${secure_url
                              .split(".")
                              .slice(-1)}`}
                          >
                            {original_filename}.
                            {secure_url.split(".").slice(-1)}
                          </h1>
                        </Attachment>
                        <span>{formatBytes(bytes)}</span>

                        <p className="date">
                          {dayjs(created_at).format("MMMM D, YYYY [at] h:mm a")}
                        </p>
                      </File>
                    )}
                  </>
                );
              })}
        </Route>
        <Route path={`/class/:classId/files/groupactivity`}>
          {loading
            ? "Loading..."
            : groupActivityFiles.map(({ id, attachment, user }) => {
                const { original_filename, secure_url, created_at, bytes } =
                  JSON.parse(attachment) ?? {};

                return (
                  <>
                    {attachment && (
                      <File key={id}>
                        <Attachment href={secure_url} download>
                          <h1
                            title={`${original_filename}.${secure_url
                              .split(".")
                              .slice(-1)}`}
                          >
                            {original_filename}.
                            {secure_url.split(".").slice(-1)}
                          </h1>
                        </Attachment>
                        <span>{formatBytes(bytes)}</span>

                        <p className="date">
                          {dayjs(created_at).format("MMMM D, YYYY [at] h:mm a")}
                        </p>
                      </File>
                    )}
                  </>
                );
              })}
        </Route>
      </Switch>
    </FileContainer>
  );
};

const FileContainer = styled.div`
  width: 100%;
  padding: 0 2em;
`;

const File = styled.div`
  width: 100%;
  border-left: 5px solid #0f482f;
  height: 110px;
  padding: 10px 20px;
  text-align: left;
  margin: 1em 1.4em;
  cursor: pointer;
  .date {
    margin: 0;
    font-size: 18px;
    color: #646464;
  }
  > span {
    font-size: 18px;
    display: block;
    color: #646464;
  }
`;

const NavBar = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 7px 1em;
  margin: 0 10px;
  border: 1px solid #0f482f;
  &:hover,
  &.active {
    color: white;
    background-color: #0f482f;
    border-radius: 5px;
  }
`;

const Attachment = styled.a`
  color: #0e5937;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  > h1 {
    margin: 0;
    padding: 0;
    font-size: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &:hover {
    background-color: #158f58;
  }
`;

export default Files;
