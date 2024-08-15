// src/components/Users.js
import  { useEffect, useState } from 'react';


const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getUsers();
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    const newUser = { name: 'John Doe', email: 'john.doe@example.com' };
    await addUser(newUser);
    const usersList = await getUsers();
    setUsers(usersList);
  };

  return (
    <div>
      <h1>Users</h1>
      <button onClick={handleAddUser}>Add User</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
