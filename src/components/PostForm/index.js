import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";
import TagsInput from "./TagsInput";
import { useUrlQuery } from "hooks/useUrlQuery";

const PostForm = ({ onSubmit, withTags }) => {
  const { tag } = useUrlQuery();
  const { register, handleSubmit, reset, watch } = useForm();
  const [tags, setTags] = useState(tag ? [tag] : []);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const attachedFileName = watch("file", false)?.[0]?.name ?? undefined;

  const handleSubmitWithLoadingAndReset = async (data) => {
    setIsSubmitting(true);
    await onSubmit({ ...data, tags });
    reset();
    setTags(tag ? [tag] : []);
    setIsSubmitting(false);
  };

  useEffect(() => {
    tag && setTags([tag]);
  }, [tag]);

  return (
    <StyledForm onSubmit={handleSubmit(handleSubmitWithLoadingAndReset)}>
      <textarea
        {...register("content", { required: true })}
        placeholder="Write Something"
      ></textarea>
      <div>
        {withTags && <TagsInput tags={tags} setTags={setTags} />}
        <select {...register("category")}>
          <option value="post" defaultValue="selected" disabled selected>
            Category
          </option>
          <option value="post">Post</option>
          <option value="question">Question</option>
        </select>
        <label for="attach-file-post" className="attachmentLabel">
          {attachedFileName ? attachedFileName : "Attach File"}
          <BsPaperclip size={15} className="attachicon" />
        </label>
        <input
          id="attach-file-post"
          type="file"
          {...register("file")}
          className="attachmentInput"
        />
      </div>

      <button className="postbutton" disabled={isSubmitting}>
        {isSubmitting ? "Posting..." : "Post"}
      </button>
    </StyledForm>
  );
};

export default PostForm;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 1em 2em;
  padding-bottom: 40px;
  position: relative;

  > div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
  }

  button,
  select,
  .attachmentLabel {
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
    outline: none;
    padding: 5px 20px;
    height: 32px;

    &:hover {
      background-color: #157348;
      color: white;
    }
  }

  .attachmentLabel {
    width: 140px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding: 8px;
  }

  .postbutton {
    position: absolute;
    bottom: 15px;
    right: 30px;
    background-color: #0f482f;
    width: 110px;
  }

  textarea {
    width: 100%;
    height: 90px;
    resize: none;
    font-size: 18px;
    border: solid #0e5937 1px;
    border-radius: 5px;
    ::placeholder {
      color: #a7a4a4;
      align-items: center;
      padding-left: 15px;
      padding-top: 20px;
    }
  }

  .attachmentInput {
    visibility: hidden;
  }

  .attachicon {
    padding-left: 10px;
    width: 24px;
    text-align: center;
  }
`;
