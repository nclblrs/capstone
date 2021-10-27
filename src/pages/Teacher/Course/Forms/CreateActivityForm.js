import React from "react";
import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { upload } from "utils/upload";
import { useParams } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import {
  CREATE_ACTIVITY,
  ACTIVITY_ATTACHMENT,
  CREATE_GROUP_ACTIVITY,
  GROUP_ACTIVITY_ATTACHMENT,
} from "./gql";
import { toast } from "react-toastify";

const CreateActivityForm = ({ onCreateFinish }) => {
  let { id } = useParams();
  const { user } = useCurrentUserContext();
  const { register, watch, handleSubmit } = useForm();
  const attachedFileName = watch("file", false)?.[0]?.name ?? undefined;

  const [createActivity, { loading: mutationLoading }] =
    useMutation(CREATE_ACTIVITY);
  const [addAttachmentToActivity] = useMutation(ACTIVITY_ATTACHMENT);
  const [createGroupActivity] = useMutation(CREATE_GROUP_ACTIVITY);
  const [addAttachmentToGroupActivity] = useMutation(GROUP_ACTIVITY_ATTACHMENT);

  const handleCreateActivity = async (data) => {
    const { title, description, dueAt, type, file: files } = data;
    const file = files[0];

    if (type === "activity") {
      try {
        const { data: createActivityData } = await createActivity({
          variables: {
            courseId: id,
            title,
            description,
            dueAt,
            type,
          },
        });

        const activityId = createActivityData?.createActivity?.id;

        if (!activityId) throw Error("something is wrong");

        if (file) {
          const { cloudinaryString } = await upload(
            file,
            user.uploadPreset,
            `Activity_${activityId}`
          );

          const { data: addAttachmentToActivityData } =
            await addAttachmentToActivity({
              variables: { id: activityId, attachment: cloudinaryString },
            });

          if (!addAttachmentToActivityData?.addAttachmentToActivity?.id)
            throw Error("something is wrong");
        }

        toast.success("Created Activity");
        onCreateFinish();
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const { data: createGroupActivityData } = await createGroupActivity({
          variables: {
            courseId: id,
            title,
            description,
            dueAt,
            type: type === "groupActivity",
          },
        });

        const groupActivityId =
          createGroupActivityData?.createGroupActivity?.id;

        if (!groupActivityId) throw Error("Something is wrong");

        if (file) {
          const { cloudinaryString } = await upload(
            file,
            user.uploadPreset,
            `GroupActivity_${groupActivityId}`
          );

          const { data: addAttachmentToGroupActivityData } =
            await addAttachmentToGroupActivity({
              variables: {
                id: groupActivityId,
                attachment: cloudinaryString,
              },
            });

          if (
            !addAttachmentToGroupActivityData?.addAttachmentToGroupActivity?.id
          )
            throw Error("something is wrong");
        }
        toast.success("Created Group Activity");
        onCreateFinish();
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateActivity)}>
      <div>
        <label>Activity Name</label>
        <input {...register("title", { required: true })} />
      </div>
      <div>
        <label for="Due Date">Due Date</label>
        <input type="datetime-local" {...register("dueAt")} />
      </div>
      <div>
        <label>Activity Type</label>
        <select {...register("type", { required: true })}>
          <option disabled selected>
            Select Type
          </option>
          <option value="activity">Individual Activity</option>
          <option value="groupActivity">Group Activity</option>
        </select>
      </div>
      <div>
        <label className="file"> File </label>
        <label for="attach-file-activity" className="attachmentLabel">
          {attachedFileName ? attachedFileName : "Attach File"}
          <BsPaperclip size={15} className="attachicon" />
        </label>
        <input
          id="attach-file-activity"
          type="file"
          {...register("file")}
          className="attachmentInput"
        />
      </div>
      <div>
        <label>Description</label>
        <input className="desc" {...register("description")} />
      </div>
      <button disabled={mutationLoading}>
        {mutationLoading ? "Creating..." : "Submit "}
      </button>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: inline-block;
    width: 140px;
  }

  input {
    width: 400px;
    font-size: 16px;
  }

  button,
  select {
    color: white;
    border: none;
    background-color: #0e5937;
    width: 100px;
    padding: 0.4em;
    font-size: 15px;
    margin-left: auto;
    cursor: pointer;
    margin-top: 10px;
  }
  select {
    width: 140px;
    margin-top: 5px;
    text-overflow: ellipsis;
  }
  option {
    text-overflow: ellipsis;
  }
  .attachmentLabel {
    font-size: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
    margin: 5px 0 5px 0;
    position: absolute;
  }
  .attachmentInput {
    visibility: hidden;
  }
  .desc {
    height: 100px;
    margin-top: 10px;
  }
  .attachicon {
    padding-left: 10px;
    width: 24px;
    text-align: center;
  }
  .file {
    margin-top: 10px;
  }
`;

export default CreateActivityForm;
