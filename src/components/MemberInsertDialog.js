import React from 'react';
import PropTypes from 'prop-types'; 
import { makeStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';  
import Typography from '@material-ui/core/Typography'; 
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
 

const useStyles =  makeStyles((theme) => ({
    
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
}));

export default function MemberInsertDialog(props) { 
    let updateEntity;
    const { onClose, open, onInsertData } = props; 
    const [insertinfo,setInsertInfo] = React.useState( { "user_id": "", "first_name": "", "last_name": "", "dob": "" ,"psswd":""});
    const classes = useStyles(); 

    const Details = (prop)=>{         
        var pairs = [];
          for(var key in prop.data){
            if(key!="psswd")
            pairs.push(
              <TextField
              autoFocus
              margin="dense"
              id= {key}
              label= {key.replace("_"," ")} 
              fullWidth  
              defaultValue = {prop.data[key]}
              onChange={(event)=>updateData(event)}                  
            /> 
            ) 
          } 
        return (
                <div className="Data-item">{pairs}</div>
        );
      }
    const updateData = (event) => {  
        insertinfo[event.target.id]=event.target.value  
    };
      const handleClose = () => { 
              onClose();
      }; 
  
      const updateMember = () => {  
        if(insertinfo.user_id!="")
            onInsertData(insertinfo)      
        onClose();
      }; 
    return (
       
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" className={classes.root} open={open} fullWidth="md" maxWidth="md">
          <DialogTitle id="simple-dialog-title">Add new member</DialogTitle>
          <IconButton aria-label="close" className={classes.closeButton}  onClick={handleClose}>
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>     
            <Typography gutterBottom > 
                <Details data={ insertinfo}
                ></Details>           
            </Typography>
          </DialogContent>
          
          <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Close
            </Button>
            <Button autoFocus onClick={updateMember} color="primary">
              Add
            </Button>
          </DialogActions>
   
        </Dialog>
      );

}
MemberInsertDialog.propTypes = {
  onClose: PropTypes.func.isRequired,   
  onInsertData: PropTypes.func.isRequired,   
  open: PropTypes.bool.isRequired, 
};