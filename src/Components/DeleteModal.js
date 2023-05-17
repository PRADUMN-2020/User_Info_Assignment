import React from "react";
import {Modal,Box,IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
function DeleteModal(props)
{
return (
        <Modal
          open={props.showDeleteMessage}
          onClose={() => props.setShowDeleteMessage(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <Box
            style={{ backgroundColor: "#fafae8" }}
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h2 id="modal-title" className='font-bold'>User Deleted</h2>
          <IconButton
            onClick={() => props.setShowDeleteMessage(false)}
            style={{ marginLeft: 'auto' }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <p id="modal-description">The user was successfully deleted.</p>
          </Box>
        </Modal>);
}

export default DeleteModal;