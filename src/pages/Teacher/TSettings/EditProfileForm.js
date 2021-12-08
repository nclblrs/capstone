import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { TEACHER_EDITUSERINFO } from "./gql";

const EditProfileForm = () => {
  const [toSubmit, setIsSubmitting] = useState(false);
  const { register, handleSubmit } = useForm();
  const { user } = useCurrentUserContext();
  const { firstName, middleName, lastName } = user ?? {};
  const [teacheredituserinfos] = useMutation(TEACHER_EDITUSERINFO);

  const handleEditUserInfo = async (data) => {
    const { firstName, middleName, lastName } = data;

    try {
      setIsSubmitting(true);
      const { data } = await teacheredituserinfos({
        variables: { firstName, middleName, lastName },
      });

      if (!data?.teacheredituserinfos?.id) {
        toast.success("Edit Successfully");
      } else {
        throw Error("Something is Wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit(handleEditUserInfo)}>
      <div>
        <label>First Name</label>
        <input
          defaultValue={firstName}
          {...register("firstName", { required: true, maxLength: 20 })}
        />
      </div>
      <div>
        <label>Middle Name</label>
        <input defaultValue={middleName} {...register("middleName")} />
      </div>
      <div>
        <label>Last Name</label>
        <input
          defaultValue={lastName}
          {...register("lastName", { required: true })}
        />
      </div>
      <button disabled={toSubmit}>
        {toSubmit ? "Confirming..." : "Submit "}
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

export default EditProfileForm;
