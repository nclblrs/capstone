import React from "react";
import styled from "styled-components";
import { useParams, Switch, Route, NavLink } from "react-router-dom";
import {
  GET_COURSE,
  CREATE_COURSE_POST,
  ADD_ATTACHMENT_TO_POST,
  COURSE_POSTS,
} from "./gql";
import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import Modal from "components/Modal";
import Dropdown, { DropdownButtons } from "components/Dropdown";
import CreateActivityForm from "pages/Teacher/Course/Forms/CreateActivityForm";
import CreateClassGroupForm from "pages/Teacher/Course/Forms/CreateClassGroupForm";
import PostForm from "components/PostForm";
import PostsFeed from "components/PostsFeed";
import { upload } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { toast } from "react-toastify";
import { FaLaptop, FaPenSquare } from "react-icons/fa";
import { MdAccountCircle, MdGroupAdd } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { BiMessageDetail, BiChevronDown } from "react-icons/bi";
import { RiFileCopy2Fill, RiFileEditLine } from "react-icons/ri";
import Files from "./Tabs/Files";
import Activities from "./Tabs/Activities";

const TCourse = () => {
  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
  const [showCreateClassGroupModal, setShowCreateClassGroupModal] =
    useState(false);

  const { classId } = useParams();
  const { user } = useCurrentUserContext();
  const {
    loading,
    data,
    refetch: refetchCourse,
  } = useQuery(GET_COURSE, {
    variables: { courseId: classId },
  });

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

  const [createPost] = useMutation(CREATE_COURSE_POST);
  const [addAttachmentToPost] = useMutation(ADD_ATTACHMENT_TO_POST);

  const {
    data: postsData,
    loading: postsLoading,
    refetch,
  } = useQuery(COURSE_POSTS, {
    variables: { courseId: classId },
  });

  const posts = postsData?.coursePosts?.data ?? [];

  const handleCreatePost = async (data) => {
    const { content, category, file: files } = data;
    const file = files[0];

    try {
      const { data: createPostData } = await createPost({
        variables: { courseId: classId, content, category },
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
      refetch();
      toast.success("Created Post");
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
            <NavMenu to={`/class/${classId}`} exact>
              <BiMessageDetail size={18} /> &nbsp; Posts
            </NavMenu>
            <NavMenu to={`/class/${classId}/files`}>
              <RiFileCopy2Fill size={18} /> &nbsp; Files
            </NavMenu>
            <NavMenu to={`/class/${classId}/activities`}>
              <RiFileEditLine size={18} /> &nbsp; Activities
            </NavMenu>
            {/*
            <NavMenu to={`/class/${classId}/submissions`}>
              <RiFileCopy2Fill size={18} /> &nbsp; Submissions
            </NavMenu> */}
            <NavMenu to={`/class/${classId}/members`}>
              <MdGroupAdd size={18} />
              &nbsp; Members
            </NavMenu>
            <NavMenu to={`/class/${classId}/groups`}>
              <TiGroup size={18} />
              &nbsp; Groups
            </NavMenu>
          </CourseFilter>
        </CoursePostHeader>
        <ItemsContainer>
          <Switch>
            <Route path={`/class/:classId`} exact>
              {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
            </Route>
            <Route path={`/class/:classId/files`}>
              <LeftContainer>
                <h1>Files</h1>
                <Files />
              </LeftContainer>
            </Route>
            <Route path={`/class/:classId/activities`}>
              <LeftContainer>
                <h1>Activities</h1>
                <Activities />
              </LeftContainer>
            </Route>
            <Route path={`/class/:classId/submissions`}>
              <LeftContainer>
                <h1>Submissions</h1>
              </LeftContainer>
            </Route>
            <Route path={`/class/:classId/members`}>
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
            <Route path={`/class/:classId/groups`}>
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
                Class Code: &nbsp; <p>{courseCode}</p>
              </h5>
              <ul>
                <li>
                  <FaLaptop size={18} />
                  &nbsp; Subject Code: {subjCode}
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Faculty: {firstName} {lastName}
                </li>
                <li>
                  <TiGroup size={18} />
                  &nbsp; Section: {yearAndSection}
                </li>
              </ul>
            </>
          )}
        </RSideAbout>
        <button>
          <Dropdown
            popperComponent={
              <DropdownButtons>
                <button onClick={() => setShowCreateActivityModal(true)}>
                  Activity
                </button>
                <button onClick={() => setShowCreateClassGroupModal(true)}>
                  Class Groups
                </button>
              </DropdownButtons>
            }
          >
            <button className="Create">
              Create &nbsp; <BiChevronDown size={18} />
            </button>
          </Dropdown>
        </button>
      </RSideContainer>
      <Modal
        show={showCreateActivityModal}
        closeModal={() => setShowCreateActivityModal(false)}
        title="Create Activity"
      >
        <CreateActivityForm
          courseId={classId}
          onCreateFinish={() => {
            refetch();
            setShowCreateActivityModal(false);
          }}
        />
      </Modal>
      <Modal
        show={showCreateClassGroupModal}
        closeModal={() => setShowCreateClassGroupModal(false)}
        title="Create Group"
      >
        <CreateClassGroupForm
          courseId={classId}
          onCreateFinish={() => {
            refetchCourse();
            setShowCreateClassGroupModal(false);
          }}
        />
      </Modal>
    </CourseContainer>
  );
};

const CourseContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const CoursePostsContainer = styled.div`
  margin-left: 275px;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const PostFormContainer = styled.div`
  width: 100%;
  display: flex;
  position: sticky;
  top: 100px;
  z-index: 1;
`;

const CoursePostHeader = styled.div`
  position: sticky;
  top: 80px;
  padding-top: 10px;
  width: 89.9%;
  background: white;
  display: flex;
  flex-direction: column;
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

  button {
    display: flex;
    background-color: white;
    color: #0f482f;
    font-size: 18px;
    justify-content: center;
    align-items: center;
    &:hover {
      background-color: #0e5937;
    }
  }
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 17px;
  align-items: center;
  text-decoration: none;
  padding: 7px 6px;
  margin: 0 5px;
  &:hover,
  &.active {
    background-color: #0e5937;
    color: white;
    border-radius: 5px;
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
      height: 380px;
      margin-bottom: 20px;
      overflow-y: scroll;

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

const ItemsContainer = styled.div`
  width: 89.9%;
  .actcontainer {
    h1 {
      color: #0f482f;
      padding: 0.2em 0.5em;
      padding-bottom: 0;
    }
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
    padding: 0.5em 1.5em 0;
  }
  .leftContent {
    padding: 2em 3em;
    ul {
      list-style-type: none;
      font-size: 20px;
    }
    h5 {
      font-size: 20px;
      color: #0f482f;
    }
  }
`;

const RSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 36.9%;
  height: 100px;
  gap: 20px;
  flex-direction: column;
  margin-left: auto;
  margin-right: 55px;
  border-radius: 10px;
  margin-top: 20px;
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
  button {
    display: flex;
    margin-left: auto;
    font-size: 16px;
    justify-content: center;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    align-items: center;
    color: white;
    .Create {
      background-color: #0e5937;
      width: 120px;
      height: 40px;
      &:hover {
        background-color: #1b6344;
      }
    }
  }
`;

const RSideAbout = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: max-content;
  border-radius: 10px;
  padding: 2em;
`;

export default TCourse;
