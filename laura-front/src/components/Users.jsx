import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users/'); // Ajusta la URL según tu configuración
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Document</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Document Type</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Last Name</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sex</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
              <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Birth Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.document}>
                <td className="py-2 px-4 border-b border-gray-200">{user.document}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.documentType}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.name}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.lastName}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.phone}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.sex}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.role}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.email}</td>
                <td className="py-2 px-4 border-b border-gray-200">{user.birthDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

