import { useQuery } from "@apollo/client";
import Modal from "components/Modal";
import { useState } from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import { MdAddCircle, MdAccountCircle } from "react-icons/md";
import { FaTrashAlt, FaPenSquare } from "react-icons/fa";

import { useUrlQuery } from "hooks/useUrlQuery";

import AddNewUserForm from "./AddNewUserForm";
import { USERS, USERS_COUNT } from "./gql";
import { smallProfpicUrl } from "utils/upload";

const Admin = () => {
  const history = useHistory();
  const location = useLocation();
  const { search } = useUrlQuery();
  const {
    data: countData,
    loading: countLoading,
    refetch: refetchCount,
  } = useQuery(USERS_COUNT);
  const {
    data: usersData,
    loading: usersLoading,
    refetch: refetchUsers,
  } = useQuery(USERS, {
    variables: { filter: { search } },
  });
  const [showNewUserModal, setShowNewUserModal] = useState(false);

  const { teachersCount, studentsCount } = countData?.usersCount ?? {};
  const users = usersData?.users?.data ?? [];

  const handleSearch = (e) => {
    e.preventDefault();

    const search = e.target.search.value;
    history.push(`${location.pathname}?search=${search}`);
  };

  return (
    <Container>
      <UsersCount>
        <div>
          <MdAccountCircle size={30} /> &nbsp;
          {countLoading ? "Loading..." : `${teachersCount} Teachers`}
        </div>
        <div>
          <MdAccountCircle size={30} /> &nbsp;
          {countLoading ? "Loading..." : `${studentsCount} Students`}
        </div>
      </UsersCount>

      <Header>
        <button onClick={() => setShowNewUserModal(true)}>
          New User &nbsp;
          <MdAddCircle size={18} className="add" />
        </button>

        <Filters onSubmit={handleSearch}>
          <input placeholder="Search" name="search" />
          <button>Search</button>
        </Filters>
      </Header>

      <UsersTable>
        <tbody>
          <tr>
            <th></th>
            <th>Name</th>
            <th>School Number</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {usersLoading ? (
            <tr>
              <td>Loading...</td>
            </tr>
          ) : (
            users.map(
              ({
                id,
                firstName,
                lastName,
                schoolIdNumber,
                emails,
                isAdmin,
                student,
                teacher,
                profilePicture = null,
              }) => {
                const { secure_url } = JSON.parse(profilePicture) ?? {};

                return (
                  <tr key={id}>
                    <td>
                      <img src={smallProfpicUrl(secure_url)} alt="a" />
                    </td>
                    <td className="name">
                      {firstName} {lastName}
                    </td>
                    <td>{schoolIdNumber}</td>
                    <td>{emails[0].address}</td>
                    <td>
                      {isAdmin
                        ? "Admin"
                        : teacher
                        ? "Teacher"
                        : student
                        ? "Student"
                        : "None"}
                    </td>
                    <td>
                      <button className="edit">
                        <FaPenSquare size={18} />
                      </button>
                    </td>
                    <td>
                      <button className="delete">
                        <FaTrashAlt size={18} />
                      </button>
                    </td>
                  </tr>
                );
              }
            )
          )}
        </tbody>
      </UsersTable>

      <Modal
        show={showNewUserModal}
        closeModal={() => setShowNewUserModal(false)}
        title="New User"
      >
        <AddNewUserForm
          onCreateFinish={() => {
            setShowNewUserModal(false);
            refetchCount();
            refetchUsers();
          }}
        />
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
`;

const UsersCount = styled.div`
  display: flex;
  gap: 20px;

  & > div {
    cursor: pointer;
    background: #f2f2f2;
    width: 300px;
    height: 110px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    padding: 48px;
    font-size: 28px;
    font-weight: 400;
    color: #0e5937;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    display: flex;
    cursor: pointer;
    background: #0e5937;
    width: 150px;
    height: 50px;
    color: white;
    border: none;
    font-size: 18px;
    align-items: center;
    justify-content: center;
  }
  input {
    font-size: 18px;
  }
`;

const Filters = styled.form`
  display: flex;
  gap: 20px;

  input {
    width: 500px;
    padding-left: 0.5em;
  }
`;

const UsersTable = styled.table`
  background: #f2f2f2;
  padding: 20px;
  border-radius: 12px;

  button {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 5px;
    background: #f2f2f2;
  }
  .edit {
    color: #0e5937;
  }
  .delete {
    color: #9b1313;
  }

  tr {
    height: 48px;
    font-size: 18px;
    font-weight: 400;
  }

  th {
    color: #646464;
    font-weight: 400;
    padding: 20px 0;
  }

  td {
    &.name {
      text-align: left;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    text-align: center;
  }
`;

export default Admin;
