import React from "react";
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
import { FaLaptop } from "react-icons/fa";
import { BiMessageDetail } from "react-icons/bi";
import { MdAccountCircle, MdGroupAdd } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { RiFileCopy2Fill } from "react-icons/ri";

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

      alert("Created Post");

      refetch();
    } catch (error) {
      alert(error);
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
            <Route path={`/class/${id}`} exact>
              {postsLoading ? "Loading..." : <PostsFeed posts={posts} />}
            </Route>
            <Route path={`/class/${id}/files`}>
              <LeftContainer>
                <div className="leftHeader">
                  <h1>Files</h1>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/class/${id}/members`}>
              <LeftContainer>
                <div className="leftHeader">
                  <h1>Members</h1>
                </div>
                <div className="leftContent">
                  <h5>
                    <p>
                      Teacher: {lastName}, {firstName}
                    </p>
                    {loading
                      ? "Loading..."
                      : students?.data?.map(({ user }) => (
                          <>
                            <h5>
                              <li>
                                {user.lastName}, {user.firstName}{" "}
                                {user.middleName}
                              </li>
                            </h5>
                          </>
                        ))}
                  </h5>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/class/${id}/groups`}>
              <GroupContainer>
                <div className="leftContent">
                  {loading
                    ? "Loading..."
                    : groups?.data?.map(({ name, students, leader }) => (
                        <>
                          <div className="groupcontainer">
                            <h5>{name}</h5>&nbsp;
                            <p>
                              Leader:{" "}
                              {leader &&
                                `${leader?.user?.lastName}, ${leader?.user?.firstName}`}
                            </p>
                            <p>Members: </p>
                            {students?.data?.map(({ user }) => (
                              <>
                                <li>
                                  {user.lastName}, {user.firstName}
                                </li>
                              </>
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
  button,
  select {
    width: 150px;
    height: 33px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;

    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
    }
  }
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
<<<<<<< HEAD

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
=======
>>>>>>> 359ccdc9eccee3abeb8f906c4b6863cf8ebf37fc
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
  padding: 10px 1em;
  margin: 0 1em;
  &:hover {
    background-color: #0e5937;
    color: white;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  margin: 1.5em 0;
  padding: 2em;
  flex-direction: column;
  .leftHeader {
    height: 20%;
    h1 {
      color: #0f482f;
    }
  }
  h5 {
    font-weight: normal;
    color: #0f482f;
    font-size: 20px;
  }
  li {
    margin: 0 2em;
  }
  .leftContent {
    width: 100%;
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
  }
`;

const GroupContainer = styled.div`
  display: flex;
  border-radius: 1em;
  padding: 1.5em 0;
  flex-direction: column;

  .leftContent {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li {
      padding: 10px 8px;
    }
    .groupcontainer {
      border-radius: 1em;
      flex-direction: column;
      display: flex;
      padding: 2em;
      width: 32%;
      background-color: #f2f2f2;
      height: 350px;
      margin-bottom: 20px;

      > h5 {
        font-weight: bold;
        color: #0f482f;
        font-size: 20px;
        margin: 0;
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
