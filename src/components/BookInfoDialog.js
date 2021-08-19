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
export default function BookInfoDialog(props) { 
    const { onClose, selectedValue, open } = props;
    const classes = useStyles(); 

    const Details = (prop)=>{    
      var pairs = [];
        for(var key in prop.data){
          if(key!="count")
            pairs.push(<p>{key} : {prop.data[key]}</p>);
        } 
      return (
              <div className="Data-item">{pairs}</div>
      );
    }

    const handleClose = () => { 
      onClose();
    };
    
    return (
       
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title"  className={classes.root} open={open} fullWidth="md" maxWidth="md">
        <DialogTitle id="simple-dialog-title">Book Information</DialogTitle>
        <IconButton aria-label="close" className={classes.closeButton}  onClick={onClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>   
          <Typography gutterBottom > 
              <Details data={selectedValue!=null?selectedValue:{}}></Details>           
          </Typography>
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
 
      </Dialog>
    );
  }
  
  BookInfoDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
  };