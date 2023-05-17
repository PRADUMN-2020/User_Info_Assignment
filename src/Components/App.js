import React, { useState, useEffect } from 'react';

import { DataGrid } from '@mui/x-data-grid';
import {
  Avatar,
  IconButton
} from '@mui/material';
 
import Header from './Header';
import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import UserStatus from "./UserStatus";

const App = () => {
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: '',
    status: '',
    lastLogin: '',
  });




  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteMessage, setShowDeleteMessage]=useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          'https://reqres.in/api/users?page=1&per_page=10'
        );
        const data = await response.json();
        const usersData = data.data;
        const updatedUsers = usersData.map((userData) => ({
          id: userData.id,
          name: `${userData.first_name} ${userData.last_name}`,
          email: userData.email,
          role: getRandomRole(),
          status: getRandomStatus(),
          lastLogin: getRandomLastLogin(),
          avatar: userData.avatar,
        }));
        setUsers(updatedUsers);
      } catch (error) {
        console.log('Error fetching users:', error);
      }
    };

    const getRandomRole = () => {
      const roles = ['Admin', 'User', 'Guest'];
      const randomIndex = Math.floor(Math.random() * roles.length);
      return roles[randomIndex];
    };

    const getRandomStatus = () => {
      const statuses = ['Active', 'Inactive'];
      const randomIndex = Math.floor(Math.random() * statuses.length);
      return statuses[randomIndex];
    };

    const getRandomLastLogin = () => {
      const currentTimestamp = new Date().getTime();
      const randomOffset = Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000; // Random offset up to 365 days
      const lastLoginTimestamp = currentTimestamp - randomOffset;
      const lastLoginDate = new Date(lastLoginTimestamp);
      return lastLoginDate;
    };

    fetchUsers();
  }, []);

  const columns = [
    {
      field: 'avatar',
      headerName: '',
      width: 120,
      renderCell: (params) => (
        <div style={{padding:"100px 40px"}}>
        <Avatar alt={params.row.name} src={params.row.avatar} />
        </div>
      ),
    },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 160 },
    { field: 'role' ,headerName: 'Role',
      width: 80
    },
    { field: 'status', headerName: 'Status', width: 100,
    renderCell: (params) => (
      <UserStatus isActive={params.row.status}/>
    )},
    { field: 'lastLogin', headerName: 'Last Login', width: 190 },
    {
      field: 'actions',
      headerName: '',
      width: 100,
      renderCell: (params) => (
        <div  style={{ backgroundColor: "#fafae8"}}>
          <IconButton
            color="info"
            onClick={() => handleEditUser(params.row)}
          >
            <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path  strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
</svg>

          </IconButton>
          <IconButton
            color="info"
            onClick={() => handleDeleteUser(params.row.id)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
</svg>

          </IconButton>
        </div>
      ),
    },
  ];

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  function controlSetOpen(val)
  {
    setOpen(val);
  }

  const handleSave = () => {
    if (selectedUser) {
      // Edit existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === selectedUser.id ? { ...newUser, id: user.id } : user
        )
      );
    } else {
      // Add new user
      setUsers((prevUsers) => [
        ...prevUsers,
        {
          ...newUser,
          id: prevUsers.length + 1,
          avatar: `https://i.pravatar.cc/150?img=${prevUsers.length + 1}`,
        },
      ]);
    }
    setNewUser({
      name: '',
      email: '',
      role: '',
      status: '',
      lastLogin: '',
    });
    setSelectedUser(null);
    setOpen(false);
  };

  const handleCancel = () => {
    setNewUser({
      name: '',
      email: '',
      role: '',
      status: '',
      lastLogin: '',
    });
    setSelectedUser(null);
    setOpen(false);
  };

  const handleEditUser = (user) => {
    setNewUser(user);
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    setShowDeleteMessage(true);
  };

  return (
    <div className="container mx-auto p-4">
      <Header controlSetOpen={controlSetOpen} />
      <div className="overflow-x-auto" style={{ backgroundColor: "#F6FFDE", boxShadow:"10px 10px 20px black", borderRadius:"1%"}}>
        <DataGrid
          style={{fontSize:"14px", fontFamily: 'Roboto Condensed',}}
          className="w-full table py-10"
          rows={users}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10]}
          initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        />
      </div>
      <EditModal handleCancel={handleCancel} open={open} selectedUser={selectedUser} newUser={newUser} handleInputChange={handleInputChange} handleSave={handleSave} han/>
     {showDeleteMessage && <DeleteModal showDeleteMessage={showDeleteMessage} setShowDeleteMessage={setShowDeleteMessage}/>}
      

    </div>
  );
};

export default App;
