import React from 'react';
import { Chip } from '@mui/material';
// import { CheckCircle, Cancel } from '@mui/icons-material';

const UserStatus = (params) => {
  const activeColor = { backgroundImage: "linear-gradient(yellow,#3dff4a)",color:"black"};
  const inactiveColor = { backgroundImage: "linear-gradient(#988ca3,#988ca3)" , color:"white"};

  return (
    <Chip
      label={params.isActive==="Active" ? 'Active' : 'Inactive'}
    //   icon={params.isActive==="Active" ? <CheckCircle /> : <Cancel />}
      style={params.isActive==="Active"?activeColor:inactiveColor}
    />
  );
};

export default UserStatus;
