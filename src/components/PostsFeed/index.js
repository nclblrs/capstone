import { Link } from "react-router-dom";
import styled from "styled-components";
import Comments from "./Comments";

const PostsFeed = ({ posts }) => {
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
          tags,
        }) => {
          const { id: userId, firstName, lastName } = user;
          const {
            title,
            description,
            attachment: activityAttachment,
            dueAt,
          } = activity ?? groupActivity ?? {};

          const { original_filename, secure_url } =
            JSON.parse(attachment) ?? {};

          return (
            <PostContainer key={id}>
              <Post>
                <img
                  src={`https://picsum.photos/seed/${userId}/80/80`}
                  alt="a"
                />
                <PostContent>
                  <h3>
                    {firstName} {lastName}
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
                    {createdAt}
                    <div className="tags">
                      {tags.map((tag) => (
                        <span>{tag}</span>
                      ))}
                    </div>
                  </h4>
                  {groupActivity || activity ? (
                    <Activity>
                      <img
                        src={`https://picsum.photos/seed/${userId}/80/80`}
                        alt="a"
                      />
                      <ActivityContent>
                        <h3>{title}</h3>
                        <p>{description}</p>
                        {activityAttachment && <Attachment>...</Attachment>}
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
                  <Link
                    to={`/class/${groupActivity.course.id}/group-activity/${groupActivity.id}`}
                  >
                    Open
                  </Link>
                )}
                {activity && (
                  <Link
                    to={`/class/${activity.course.id}/activity/${activity.id}`}
                  >
                    Open
                  </Link>
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
`;

const Post = styled.div`
  margin: 16px 0;
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
  }
  > h4 {
    margin: 0;
    color: #646464;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    align-items: center;

    .category,
    .tags > span {
      background: #e7b22a;
      color: white;
      font-size: 14px;
      padding: 4px 10px;
      border-radius: 4px;
      margin-right: 12px;
    }

    .tags {
      margin-left: 12px;
      > span {
        background: #646464;
      }
    }
  }
  > p {
    color: #0f482f;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.5px;
  }
`;

const Activity = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 10px;

  > img {
    width: 20px;
    height: 20px;
  }
`;

const ActivityContent = styled.div`
  > h3 {
    color: #0f482f;
    font-size: 18px;
    font-weight: 400;
    margin: 0;
  }

  > p {
    color: #0f482f;
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.5px;
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
`;
<<<<<<< HEAD

const CommentForm = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  > input {
    width: 100%;
    height: 40px;
    padding-left: 10px;
  }

  > button {
    background: #0e5937;
    color: white;
    height: 30px;
    padding: 10px 20px;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
=======
>>>>>>> f6903a22c296e6f9461c7d7ea27a34845c03290a
