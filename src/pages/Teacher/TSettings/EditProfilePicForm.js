import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { toast } from "react-toastify";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { useState } from "react";
import { upload } from "utils/upload";
import { CHANGE_PROFILEPIC } from "./gql";

const EditProfilePicForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user } = useCurrentUserContext();
  const [changeProfilePicture] = useMutation(CHANGE_PROFILEPIC);

  const handleChangeProfilePicture = async (data) => {
    const { file: files } = data;
    const file = files[0];

    try {
      setIsSubmitting(true);

      if (file) {
        const { cloudinaryString } = await upload(
          file,
          user.uploadPreset,
          `User_${user.id}`
        );

        const { data: changeProfilePictureData } = await changeProfilePicture({
          variables: { profilePicture: cloudinaryString },
        });

        if (!changeProfilePictureData?.changeProfilePicture?.id)
          throw Error("something is wrong");
      }

      toast.success("Profile Picture uploaded");
    } catch (error) {
      toast.error(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit(handleChangeProfilePicture)}>
      <label for="attach-file-submission" className="attachmentLabel"></label>
      <input
        id="attach-file-submission"
        type="file"
        {...register("file")}
        className="attachmentInput"
        accept="image/*"
      />
      <button disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Submit "}
      </button>
    </Form>
  );
};

const Form = styled.form`
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

  button {
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
`;

export default EditProfilePicForm;
