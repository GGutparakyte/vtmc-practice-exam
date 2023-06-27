import React, { useState, useEffect } from 'react';
import { useFetch } from 'use-http/dist/esm';
import Table from 'pages/shared/table/table';

interface User {
  userNo: number;
  name: string;
  age: number;
  icon?: string; 
}

const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const { get: getData } = useFetch(`${process.env.REACT_APP_BASE_URL}/api/users`, { method: 'GET' });

  const columns: { key: keyof User; title: string; render?: ((value: User) => React.ReactNode) | undefined }[] = [
    { key: 'userNo', title: 'User No' },
    { key: 'name', title: 'Name' },
    { key: 'age', title: 'Age' },
    {
      key: 'icon',
      title: 'Actions',
      render: (user: User) => (
        <>
          <button onClick={() => handleDelete(user)}>Delete</button>
          <button onClick={() => handleUpdate(user)}>Update</button>
        </>
      ),
    },
  ];

  useEffect(() => {
    getData().then((response: User[]) => {
      setUsers(response);
    });
  }, []);

  const handleDelete = (user: User) => {
    // handle delete user here
  };

  const handleUpdate = (user: User) => {
    // handle update user here
  };

  return <Table data={users} columns={columns} />;
};

export default UsersPage;
