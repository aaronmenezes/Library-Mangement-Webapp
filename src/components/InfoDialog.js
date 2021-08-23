import React from 'react';
import PropTypes from 'prop-types'; 
import { makeStyles } from '@material-ui/core/styles'; 
import {Button,Paper,Grid,Typography,IconButton} from '@material-ui/core'; 
import {DialogTitle ,DialogContent,DialogActions,Dialog }from '@material-ui/core';   
import CloseIcon from '@material-ui/icons/Close';  

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
export default function InfoDialog(props) { 
  const { onClose, selectedValue, open } = props;
  const classes = useStyles(); 

  const Details = (prop)=>{    
    var pairs = [];
      for(var key in prop.data){
        pairs.push(<p>{key.replaceAll("_"," ")} : {prop.data[key]}</p>);
      } 
    return ( <div className="Data-item">{pairs}</div> );
  }

  const handleClose = () => { 
    onClose();
  };
    
  return (      
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title"  className={classes.root} open={open} fullWidth="md" maxWidth="md">
      <DialogTitle id="simple-dialog-title">All Information</DialogTitle>
      <IconButton aria-label="close" className={classes.closeButton}  onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>  
        <Grid container spacing={3}> 
          <Grid item xs={12} md={4} lg={6}>     
            <Paper className={classes.paper} elevation={3} >
                <h3>Book Issue Details</h3>
                <Details data={selectedValue!=null?selectedValue["bag_item"]:{}}></Details> 
            </Paper>
            <Paper className={classes.paper} elevation={3}  style={{marginTop:"20px"}}  >              
                <h3>User Details</h3>
              <Details data={selectedValue!=null?selectedValue["member_item"]:{}}></Details>  
            </Paper>
          </Grid>           
          <Grid item xs={12} md={4} lg={6}>     
            <Paper className={classes.paper} elevation={3}  >
                <h3>Book Details</h3>
                <Details data={selectedValue!=null?selectedValue["book_item"]:{}}></Details>           
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
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