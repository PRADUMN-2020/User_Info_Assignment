import React from "react";
import {
    Button,
    Modal,
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
  } from '@mui/material';


  function EditModal(props)
  {
    return(
<Modal
        open={props.open}
        onClose={props.handleCancel}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        
      >
        <Box
         style={{ backgroundColor: "#fafae8"}}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius:5
          }}
        >
          <h2 id="modal-title">{props.selectedUser ? 'Edit User' : 'Add User'}</h2>
         

 <TextField
            name="name"
            label="Name"
            value={props.newUser.name}
            onChange={props.handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="email"
            label="Email"
            value={props.newUser.email}
            onChange={props.handleInputChange}
            fullWidth
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={props.newUser.role}
              onChange={props.handleInputChange}
            >
              <MenuItem value="Admin">Admin</MenuItem>
              <MenuItem value="User">User</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel>Status</InputLabel>
            <Select
              name="status"
              value={props.newUser.status}
              onChange={props.handleInputChange}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Inactive">Inactive</MenuItem>
            </Select>
          </FormControl>
          <TextField
            name="lastLogin"
            label="Last Login"
            value={props.newUser.lastLogin}
            onChange={props.handleInputChange}
            fullWidth
            margin="normal"
          />
          <div className="flex justify-end">
            <Button variant="contained" onClick={props.handleSave} className="mr-2">
              {props.selectedUser ? 'Save Changes' : 'Add User'}
            </Button>
            <Button variant="outlined" onClick={props.handleCancel}>
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>);
  }

  export default EditModal