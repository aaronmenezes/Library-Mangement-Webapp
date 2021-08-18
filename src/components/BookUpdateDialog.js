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
import TextField from '@material-ui/core/TextField';
 

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
}));

export default function BookUpdateDialog(props) { 
    let updateEntity;
    const { onClose, selectedValue, open, onUpdateData } = props; 
    const classes = useStyles(); 
    const Details = (prop)=>{    
     
            var pairs = [];
              for(var key in prop.data){
                if(key!="bookID")
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
      if(updateEntity==null)
        updateEntity=selectedValue["book_item"]
      updateEntity[event.target.id]=event.target.value  
    };
    const handleClose = () => { 
            onClose();
    }; 

    const updateBook = () => { 
      if(updateEntity)
        onUpdateData(updateEntity)      
      onClose();
    }; 
    return (
       
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" className={classes.root} open={open} fullWidth="md" maxWidth="md">
        <DialogTitle id="simple-dialog-title">Update Book Info</DialogTitle>
        <IconButton aria-label="close" className={classes.closeButton}  onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>     
          <Typography gutterBottom > 
              <Details data={selectedValue!=null?selectedValue["book_item"]:{}}></Details>           
          </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <Button autoFocus onClick={updateBook} color="primary">
            Update
          </Button>
        </DialogActions>
 
      </Dialog>
    );
  }
  
  BookUpdateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,   
    onUpdateData: PropTypes.func.isRequired,   
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
  };