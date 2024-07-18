import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'tailwindcss/tailwind.css';

const UserForm = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: ''
  });
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState(null);
  const [timeTaken, setTimeTaken] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://192.168.2.149:4000/restapi');
      setUsers(response.data.users);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const startTime = Date.now();
    try {
      const response = await axios.post('http://192.168.2.149:4000/graphql', {
        query: `
          mutation CreateUser($input: CreateUserInput!) {
            createUser(input: $input) {
              msg
              user {
                id
                name
                email
              }
            }
          }
        `,
        variables: {
          input: {
            name: formData.name,
            email: formData.email
          }
        }
      });

      const endTime = Date.now();
      setTimeTaken(endTime - startTime);
      setResponse(response.data);
      fetchUsers(); // Refresh the user list
      // Clear the form data
      setFormData({
        name: '',
        email: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const startTime = Date.now();
    try {
      const response = await axios.post('http://192.168.2.149:4000/graphql', {
        query: `
          mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
            updateUser(id: $id, input: $input) {
              msg
              user {
                name
                email
              }
            }
          }
        `,
        variables: {
          id: formData.id,
          input: {
            name: formData.name,
            email: formData.email
          }
        }
      });

      const endTime = Date.now();
      setTimeTaken(endTime - startTime);
      setResponse(response.data);
      fetchUsers(); // Refresh the user list
      // Clear the form data
      setFormData({
        id: '',
        name: '',
        email: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    const startTime = Date.now();
    try {
      const response = await axios.post('http://192.168.2.149:4000/graphql', {
        query: `
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id) {
              success
              message
            }
          }
        `,
        variables: {
          id: formData.id
        }
      });

      const endTime = Date.now();
      setTimeTaken(endTime - startTime);
      setResponse(response.data);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error(error);
    }
  };

  // axios delete 
  const handleDeleteAxios = async (e) => {
    e.preventDefault();
    const startTime = Date.now();
    try {
      const response = await axios.delete(`http://192.168.2.149:4000/restapi/${formData.id}`);

      const endTime = Date.now();
      setTimeTaken(endTime - startTime);
      setResponse(response.data);
      fetchUsers(); // Refresh the user list
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex">
      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">User Management</h2>
        <form className="space-y-2" onSubmit={handleCreate}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md flex items-center"
          >
            <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3219873/graphql-icon-md.png" alt="GRAPHQL Logo" className="h-6 w-6 mr-2" />
            Create User (GraphQL)
          </button>
        </form>

        <form className="space-y-2 mt-4" onSubmit={handleUpdate}>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="User ID"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="border border-gray-300 rounded-md p-2 w-full"
          />
          <button
            type="submit"
            className="bg-yellow-500 hover:bg-gray-300 text-white font-semibold py-2 px-4 rounded-md flex items-center"
          >
            <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3219873/graphql-icon-md.png" alt="GRAPHQL Logo" className="h-6 w-6 mr-2" />
            Update User (GraphQL)
          </button>
        </form>

        <form className="space-y-2 mt-4" onSubmit={handleDelete}>
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="User ID"
            className="border border-gray-300 rounded-md p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-white-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md flex items-center"
          >
            <img src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3219873/graphql-icon-md.png" alt="GRAPHQL Logo" className="h-6 w-6 mr-2" />
            Delete User (GraphQL)
          </button>
          <button
            type="submit"
            onClick={handleDeleteAxios}
            className="bg-gray-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md flex items-center"
          >
            <img src="https://www.toucantoco.com/hs-fs/hubfs/rest-api-icon.webp?width=367&height=300&name=rest-api-icon.webp" alt="REST API Logo" className="h-6 w-6 mr-2" />
            Delete User (Rest-API)
          </button>

        </form>
      </div>

      <div className="w-1/2 p-4">
        <h2 className="text-xl font-semibold mb-4">Users List</h2>
        <div className="max-h-56 overflow-y-auto border border-green-300 rounded-md">
          <table className="min-w-full">
            <thead className="bg-gray-900 sticky top-0">
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{user.id}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {response && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Response:</h3>
            <pre className="p-2 rounded">{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {timeTaken !== null && (
          <div className="mt-2">
            <h3 className="text-lg font-semibold">Time Taken:</h3>
            <p>{timeTaken} ms</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
