import React from "react";
import { toast } from "react-toastify";
import {
  ADD_ATTACHMENT_TO_POST,
  COURSE_POSTS,
  CREATE_COURSE_POST,
  GET_COURSE,
} from "./gql";
import { useMutation, useQuery } from "@apollo/client";
import { useParams, NavLink, Switch, Route } from "react-router-dom";
import styled from "styled-components";
import PostsFeed from "components/PostsFeed";
import { upload } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import PostForm from "components/PostForm";
import { FaLaptop, FaPenSquare } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { MdAccountCircle, MdGroupAdd } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { RiFileCopy2Fill } from "react-icons/ri";
import Files from "./CourseTabs/Files";

import Dropdown, { DropdownButtons } from "components/Dropdown";

const Course = () => {
  let { id } = useParams();
  const { user } = useCurrentUserContext();

  const [createPost] = useMutation(CREATE_COURSE_POST);
  const [addAttachmentToPost] = useMutation(ADD_ATTACHMENT_TO_POST);

  const { loading, data } = useQuery(GET_COURSE, {
    variables: { courseId: id },
  });
  const {
    data: postsData,
    loading: postsLoading,
    refetch,
  } = useQuery(COURSE_POSTS, {
    variables: { courseId: id },
  });

  const posts = postsData?.coursePosts?.data ?? [];

  const {
    name,
    subjCode,
    teacher,
    courseCode,
    yearAndSection,
    students,
    groups,
  } = data?.course ?? {};

  const { firstName, lastName } = teacher?.user ?? {};

  const handleCreatePost = async (data) => {
    const { content, category, file: files } = data;
    const file = files[0];

    try {
      const { data: createPostData } = await createPost({
        variables: { courseId: id, content, category },
      });
      const postId = createPostData?.createPost?.id;

      if (!postId) throw Error("something is wrong");

      if (file) {
        const { cloudinaryString } = await upload(
          file,
          user.uploadPreset,
          `Post_${postId}`
        );
        const { data: addAttachmentToPostData } = await addAttachmentToPost({
          variables: { id: postId, attachment: cloudinaryString },
        });

        if (!addAttachmentToPostData?.addAttachmentToPost?.id)
          throw Error("something is wrong");
      }

      toast.success("Created Post");

      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <CourseContainer>
      <CoursePostsContainer>
        <CoursePostHeader>
          <PostFormContainer>
            <PostForm onSubmit={handleCreatePost} />
          </PostFormContainer>
          <CourseFilter>
            <NavMenu to={`/class/${id}`} exact>
              <BiMessageDetail size={18} /> &nbsp; Posts
            </NavMenu>
            <NavMenu to={`/class/${id}/files`}>
              <RiFileCopy2Fill size={18} /> &nbsp; Files
            </NavMenu>
            <NavMenu to={`/class/${id}/activities`}>
              <FaLaptop size={18} />
              &nbsp; Activities
            </NavMenu>
            <NavMenu to={`/class/${id}/members`}>
              <MdGroupAdd size={18} />
              &nbsp; Members
            </NavMenu>
            <NavMenu to={`/class/${id}/groups`}>
              <TiGroup size={18} />
              &nbsp; Groups
            </NavMenu>
          </CourseFilter>
        </CoursePostHeader>
        <ItemsContainer>
          <Switch>
            <Route path={`/class/:id`} exact>
              {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
            </Route>
            <Route path={`/class/:id/files`}>
              <LeftContainer>
                <h1>Files</h1>
                <Files />
              </LeftContainer>
            </Route>
            <Route path={`/class/:id/activities`}>
              <LeftContainer>
                <h1>Activities</h1>
                <div className="leftContent"></div>
              </LeftContainer>
            </Route>
            <Route path={`/class/:id/members`}>
              <LeftContainer>
                <h1>Members</h1>
                <div className="leftContent">
                  <h5>
                    Teacher : {lastName}, {firstName}
                  </h5>
                  {loading
                    ? "Loading..."
                    : students?.data?.map(({ id, user }) => (
                        <ul key={id}>
                          <li>
                            {user.lastName}, {user.firstName} {user.middleName}
                          </li>
                        </ul>
                      ))}
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/class/:id/groups`}>
              <GroupContainer>
                <div className="leftContent">
                  {loading
                    ? "Loading..."
                    : groups?.data?.map(({ id, name, students, leader }) => (
                        <>
                          <div key={id} className="groupcontainer">
                            <h5>
                              {name}
                              <button>
                                <Dropdown
                                  popperComponent={
                                    <DropdownButtons>
                                      <button>Edit Information</button>
                                    </DropdownButtons>
                                  }
                                >
                                  <FaPenSquare
                                    size={20}
                                    color="#0e5937"
                                    className="pen"
                                  />
                                </Dropdown>
                              </button>
                            </h5>
                            <p>
                              Leader: &nbsp;
                              {leader &&
                                `${leader?.user?.lastName}, ${leader?.user?.firstName}`}
                            </p>
                            <p>Members: </p>
                            {students?.data?.map(({ id, user }) => (
                              <ul key={id}>
                                <li>
                                  {user.lastName}, {user.firstName}
                                </li>
                              </ul>
                            ))}
                          </div>
                        </>
                      ))}
                </div>
              </GroupContainer>
            </Route>
          </Switch>
        </ItemsContainer>
      </CoursePostsContainer>
      <RSideContainer>
        <RSideAbout>
          <h3>ABOUT</h3>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <h4>{name}</h4>
              <h5>
                Class Code: <p>&nbsp;{courseCode}</p>
              </h5>
              <ul>
                <li>
                  <FaLaptop size={18} />
                  &nbsp; Subject Code: {subjCode}
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Faculty: {firstName}&nbsp;
                  {lastName}
                </li>
                <li>
                  <TiGroup size={18} />
                  &nbsp; Section: {yearAndSection}
                </li>
              </ul>
            </>
          )}
        </RSideAbout>
        <RSideToDo>
          <h3>TO-DO</h3>
        </RSideToDo>
      </RSideContainer>
    </CourseContainer>
  );
};

const CourseContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`;

const CoursePostsContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
`;

const PostFormContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  z-index: 1;
`;

const CourseFilter = styled.nav`
  display: flex;
  position: sticky;
  top: 400px;
  height: 50px;
  width: 100%;
  align-items: center;
  margin: 15px 0px auto;
  border-bottom: solid #0f482f 3px;
`;

const RSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 400px;
  height: 100px;
  gap: 20px;
  min-width: 400px;
  flex-direction: column;
  border-radius: 10px;
  margin: 0 2em;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
  h4 {
    color: #0f482f;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
  }
  h5 {
    color: #0f482f;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    padding-top: 10px;
  }
  p {
    margin: 0;
    color: #646464;
  }

  ul {
    font-size: 20px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
    margin-top: 20px;
  }
  li {
    padding: 8px 8px;
  }
`;

const RSideAbout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 320px;
  border-radius: 10px;
  padding: 2em;
`;

const RSideToDo = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 7px 1em;
  margin: 0 10px;
  &:hover,
  &.active {
    background-color: #0e5937;
    color: white;
    border-radius: 5px;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  flex-direction: column;
  width: 100%;
  height: 550px;
  margin-top: 1.5em;
  overflow-y: scroll;
  > h1 {
    color: #0f482f;
    padding: 0.5em 1.5em;
  }
  .leftContent {
    position: absolute;
    padding: 4.2em 3em;
    ul {
      list-style-type: none;
      font-size: 20px;
    }
    > h5 {
      font-size: 20px;
      color: #0f482f;
    }
  }
`;

const GroupContainer = styled.div`
  display: flex;
  border-radius: 1em;
  padding: 1.5em 0;
  flex-direction: column;

  h5 {
    font-weight: bold;
    color: #0f482f;
    text-align: left;
    font-size: 20px;
    display: flex;
    margin: 0;
    margin-bottom: 1em;
  }

  button {
    justify-content: center;
    margin-left: auto;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
  }

  .leftContent {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .groupcontainer {
      border-radius: 1em;
      flex-direction: column;
      display: flex;
      padding: 2em;
      width: 32%;
      background-color: #f2f2f2;
      height: 350px;
      margin-bottom: 20px;

      p {
        margin-top: 7px;
        color: #0f482f;
        font-size: 16px;
        font-weight: bold;
      }
      ul {
        list-style-type: none;
        margin: 10px;
      }
    }
  }
`;

const CoursePostHeader = styled.div`
  position: sticky;
  top: 80px;
  padding-top: 10px;
  width: 100%;
  background: white;
  z-index: 1;
`;

const ItemsContainer = styled.div`
  width: 100%;
`;

export default Course;
