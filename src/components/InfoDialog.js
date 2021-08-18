import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
 

export default function InfoDialog(props) { 
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => { 
      onClose();
    };
    if(selectedValue)
        console.log(selectedValue)
    return (
       
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">{selectedValue?selectedValue.name:""}</DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
          {selectedValue!=null?selectedValue["book_item"]["title"]:""}
          </Typography>
          <Typography gutterBottom>
          {selectedValue!=null?selectedValue["bag_item"]["bagId"]:""}
          </Typography>
          <Typography gutterBottom>
          {selectedValue!=null?selectedValue["member_item"]["first_name"]:""}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button>
        </DialogActions>
 
      </Dialog>
    );
  }
  
  InfoDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
  };