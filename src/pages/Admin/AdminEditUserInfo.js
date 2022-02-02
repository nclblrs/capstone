import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useState } from "react";
import { ADMIN_EDITUSER_INFO } from "./gql";

const AdminEditProfileForm = (props) => {
  const [toSubmit, setIsSubmitting] = useState(false);
  const [Adminedituserinfos] = useMutation(ADMIN_EDITUSER_INFO);
  const { register, handleSubmit } = useForm();
  const {
    id,
    firstName,
    middleName,
    lastName,
    courseDept,
    yearLevel,
    section,
    schoolIdNumber,
    emails,
  } = props.userToEdit;

  const handleAdminEditUserInfo = async (data) => {
    const {
      firstName,
      middleName,
      lastName,
      courseDept,
      yearLevel,
      section,
      schoolIdNumber,
      email,
    } = data;

    try {
      setIsSubmitting(true);
      const { data } = await Adminedituserinfos({
        variables: {
          id,
          firstName,
          middleName,
          lastName,
          courseDept,
          yearLevel,
          section,
          schoolIdNumber,
          email,
        },
      });

      if (!data?.Adminedituserinfos?.id) {
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
    <Form onSubmit={handleSubmit(handleAdminEditUserInfo)}>
      <div>
        <label>First Name</label>
        <input
          type="text"
          defaultValue={firstName}
          {...register("firstName", { required: true, maxLength: 20 })}
        />
      </div>
      <div>
        <label>Middle Name</label>
        <input
          type="text"
          defaultValue={middleName}
          {...register("middleName")}
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          type="text"
          defaultValue={lastName}
          {...register("lastName", { required: true })}
        />
      </div>
      <div>
        <label> Course </label>
        <input
          type="text"
          defaultValue={courseDept}
          {...register("courseDept", { required: true })}
        />
      </div>
      <div>
        <label> Section </label>
        <input
          type="text"
          defaultValue={section}
          {...register("section", { required: true })}
        />
      </div>
      <div>
        <label>Year-Level</label>
        <input
          type="text"
          defaultValue={yearLevel}
          {...register("Year-Level", { required: true })}
        />
      </div>
      <div>
        <label>School ID Number</label>
        <input
          type="text"
          defaultValue={schoolIdNumber}
          {...register("School ID Number", { required: true })}
        />
      </div>
      <div>
        <label>Email</label>
        <input
          type="text"
          defaultValue={emails[0].address}
          {...register("email", { required: true })}
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

export default AdminEditProfileForm;
