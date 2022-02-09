import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { ADMIN_CREATE_USER, CREATE_ADMIN } from "./gql";

const AddNewUserForm = ({ onCreateFinish }) => {
  const [adminCreateUser, { loading: createUserLoading }] =
    useMutation(ADMIN_CREATE_USER);
  const [createAdmin, { loading: createAdminLoading }] =
    useMutation(CREATE_ADMIN);
  const loading = createUserLoading || createAdminLoading;
  const { register, handleSubmit, reset, watch } = useForm();
  const watchType = watch("type");
  const onSubmit = async (data) => {
    console.log(data);

    const {
      firstName,
      middleName,
      lastName,
      email,
      schoolIdNumber,
      yearLevel,
      courseDept,
      section,
      type,
    } = data;

    if (type === "admin") {
      try {
        const { data } = await createAdmin({
          variables: {
            firstName,
            middleName,
            lastName,
            email,
            schoolIdNumber,
          },
        });

        if (data?.createAdmin?.id) {
          toast.success("Created successfully");
          onCreateFinish();
          reset();
        } else {
          throw Error("something is wrong");
        }
      } catch (error) {
        toast.error(error.message);
      }
    } else {
      try {
        const { data } = await adminCreateUser({
          variables: {
            firstName,
            middleName,
            lastName,
            email,
            schoolIdNumber,
            yearLevel,
            courseDept,
            section,
            isTeacher: type === "teacher",
          },
        });

        if (data?.adminCreateUser?.id) {
          toast.success("Created successfully");
          onCreateFinish();
          reset();
        } else {
          throw Error("something is wrong");
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>User Type</label>
        <select {...register("type", { required: true })}>
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
      </div>

      <div>
        <label>First Name</label>
        <input
          {...register("firstName", {
            required: true,
            pattern: /[A-Za-z]/,
          })}
          placeholder="First Name"
        />
      </div>
      <div>
        <label>Middle Name</label>
        <input
          {...register("middleName", { pattern: /[A-Za-z]/ })}
          placeholder="Middle Name (leave blank if N/A)"
        />
      </div>
      <div>
        <label>Last Name</label>
        <input
          {...register("lastName", { required: true, pattern: /[A-Za-z]/ })}
          placeholder="Last Name"
        />
      </div>
      <div>
        <label>Email</label>
        <input
          {...register("email", {
            required: true,
            pattern: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/,
          })}
          placeholder="Email"
        />
      </div>
      {watchType === "student" ? (
        <>
          <div>
            <label> Course </label>
            <select {...register("courseDept", { required: true })}>
              <option value="BSIT">BSIT</option>
              <option value="BSCS">BSCS</option>
            </select>
          </div>
          <div>
            <label> Year-Level </label>
            <select {...register("yearLevel", { required: true })}>
              <option value="1st">1st year</option>
              <option value="2nd">2nd year</option>
              <option value="3rd">3rd year</option>
              <option value="4th">4th year</option>
            </select>
          </div>
          <div>
            <label>Section</label>
            <input
              {...register("section", { required: true })}
              placeholder="Section"
            />
          </div>
        </>
      ) : (
        ""
      )}
      {watchType === "teacher" || watchType === "student" ? (
        <div>
          <label>School Number</label>
          <input
            {...register("schoolIdNumber", { required: true })}
            placeholder="School ID Number"
          />
        </div>
      ) : (
        ""
      )}

      <button disabled={loading}>Submit</button>
    </Form>
  );
};

const Form = styled.form`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

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
  }
`;

export default AddNewUserForm;
