import { Link } from "react-router-dom";
import styled from "styled-components";
import dayjs from "dayjs";
import { useLocation } from "react-router";
import Comments from "./Comments";
import { RiFileCopy2Fill } from "react-icons/ri";
import { smallProfpicUrl } from "utils/upload";

const PostsFeed = ({ posts }) => {
  const location = useLocation();

  return (
    <Container>
      {posts.map(
        ({
          id,
          user,
          createdAt,
          content,
          category,
          activity,
          groupActivity,
          attachment,
          group,
          course,
          tags,
        }) => {
          const { firstName, lastName, profilePicture = null } = user ?? {};
          const {
            id: activityId,
            title,
            description,
            attachment: activityAttachment = null,
            dueAt,
            mySubmission,
          } = activity ?? groupActivity ?? {};
          const { type: groupType } = group ?? {};

          const { original_filename, secure_url } =
            JSON.parse(attachment) ?? JSON.parse(activityAttachment) ?? {};

          const { secure_url: secure_url2 } = JSON.parse(profilePicture) ?? {};

          const postedIn = group || course;

          return (
            <PostContainer key={id}>
              <Post>
                <img src={smallProfpicUrl(secure_url2)} alt="a" />
                <PostContent>
                  <h3>
                    {firstName} {lastName}
                    {postedIn && (
                      <>
                        {" "}
                        <span>in</span>{" "}
                        <Link
                          to={
                            (postedIn.__typename === "Group"
                              ? "/group/"
                              : "/class/") + postedIn.id
                          }
                          title={postedIn.name}
                        >
                          {postedIn.name}
                        </Link>
                        <span className="type">
                          {" "}
                          (
                          {postedIn.__typename === "Group"
                            ? groupType === "CLASS"
                              ? "Course Group"
                              : "Study Group"
                            : "Class"}
                          )
                        </span>
                      </>
                    )}
                  </h3>
                  <h4>
                    <span className="category">
                      {activity
                        ? "Activity"
                        : groupActivity
                        ? "Group Activity"
                        : category === "question"
                        ? "Question"
                        : "Post"}
                    </span>
                    {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                    <div className="tags">
                      {tags.map((tag, index) => (
                        <Link
                          className="TagLink"
                          key={index}
                          to={
                            group
                              ? `/group/${group.id}?tag=${tag}`
                              : `${location.pathname}?tag=${tag}`
                          }
                          title={tag}
                        >
                          #{tag}
                        </Link>
                      ))}
                    </div>
                  </h4>
                  {groupActivity || activity ? (
                    <Activity>
                      <RiFileCopy2Fill className="activityLogo" size={18} />
                      <ActivityContent>
                        <h3>
                          {title}{" "}
                          {mySubmission && (
                            <span className="submitted">
                              (Submitted on Time)
                            </span>
                          )}
                        </h3>
                        <h4>
                          Due: {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}{" "}
                        </h4>

                        <p>{description}</p>

                        {activityAttachment && (
                          <Attachment href={secure_url} download>
                            {original_filename}.
                            {secure_url.split(".").slice(-1)}
                          </Attachment>
                        )}
                      </ActivityContent>
                    </Activity>
                  ) : (
                    <p>{content}</p>
                  )}
                  {attachment && (
                    <Attachment href={secure_url} download>
                      {original_filename}.{secure_url.split(".").slice(-1)}
                    </Attachment>
                  )}
                </PostContent>
                {groupActivity && (
                  <Link to={`/class/${id}/groupactivity/${activityId}`}>
                    Open
                  </Link>
                )}
                {activity && (
                  <Link to={`/class/${id}/activity/${activityId}`}>Open</Link>
                )}
              </Post>

              <Comments postId={id} />
            </PostContainer>
          );
        }
      )}
    </Container>
  );
};

export default PostsFeed;

const Container = styled.div`
  width: 100%;
`;

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 25px 0;
  border-radius: 1em;
  background-color: #f2f2f2;
  width: 100%;
`;

const Post = styled.div`
  padding: 24px 18px;
  padding-right: 40px;
  display: flex;
  gap: 20px;
  position: relative;

  > img {
    width: 68px;
    height: 68px;
    border-radius: 50%;
  }

  > a {
    background: #0e5937;
    color: white;
    height: 30px;
    padding: 10px 30px;
    position: absolute;
    top: 12px;
    right: 12px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
  }
`;

const PostContent = styled.div`
  width: 100%;

  > h3 {
    margin: 0;
    color: #0f482f;
    font-size: 20px;
    font-weight: 400;
    margin: 8px 0;

    > span {
      color: #646464;
    }

    a {
      color: #0f482f;
      text-decoration: none;
    }
    > .type {
      font-size: 16px;
      margin-left: 5px;
    }
  }
  > h4 {
    margin: 0;
    color: #646464;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;

    .category,
    .tags > .TagLink {
      color: white;
      font-size: 14px;
      text-decoration: none;
    }

    .category {
      background: #e7b22a;
      padding: 4px 10px;
      border-radius: 4px;
      margin-right: 12px;
    }

    .TagLink {
      width: 100%;
      padding: 4px 10px;
      border-radius: 4px;
      background: #0e5937;
      margin: 0 4px;
    }
  }
  > p {
    color: #0f482f;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Activity = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;

  .activityLogo {
    color: #0e5937;
  }
`;

const ActivityContent = styled.div`
  width: 100%;
  > h4 {
    color: #0e5937;
    font-weight: normal;
    font-size: 17px;
    margin: 0 0 0.5em;
    .submitted {
      color: #646464;
      font-size: 15px;
    }
  }
  > h3 {
    color: #0f482f;
    font-size: 20px;
    font-weight: 400;
    margin: 0;
    margin-bottom: 10px;
    > span {
      color: #646464;
      font-size: 14px;
    }
  }

  > p {
    color: #646464;
    font-size: 16px;
    font-weight: 400;
  }
`;

const Attachment = styled.a`
  background: #0e5937;
  color: white;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  padding: 10px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  &:hover {
    background-color: #158f58;
  }
`;
