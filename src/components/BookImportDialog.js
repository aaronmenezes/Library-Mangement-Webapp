import React from 'react';
import PropTypes from 'prop-types'; 
import { makeStyles } from '@material-ui/core/styles'; 
import Button from '@material-ui/core/Button'; 
import DialogTitle from '@material-ui/core/DialogTitle'; 
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';   
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'; 
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

export default function BookImportDialog(props) { 
    const { onClose, selectedValue, open, onCheckoutData } = props;  
    const [ importCount, setImportCount] = React.useState( null);
    const classes = useStyles();  

    const Details = (prop)=>{    
      var pairs = [];
        for(var key in prop.data){
          if(key!=="count" && key!=="inventory_count")
            pairs.push(<p>{key} : {prop.data[key]}</p>);
        } 
      return (
             <div className="Data-item">{pairs}</div>
      );
    }
 
    
    const checkoutData = () => {   
      let updateEntity=selectedValue
      updateEntity["import_count"]= importCount
      onCheckoutData(updateEntity)
      handleClose()
    };

    const handleClose = () => { 
      onClose();
    }; 

    const handleCountChange=(event)=>{
      setImportCount(event.target.value)
    }
 
    return (
       
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" className={classes.root} open={open} fullWidth="md" maxWidth="md">
        <DialogTitle id="simple-dialog-title">Import Book</DialogTitle>
        <IconButton aria-label="close" className={classes.closeButton}  onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>    
        <Grid container spacing={3}> 
        <Grid item xs={12} md={4} lg={6}>  
            <Paper className={classes.paper} elevation={3} >
              <h3>Inventory Details</h3>
              <p> Book Count in Inventory : {selectedValue!=null?selectedValue["inventory_count"]:0}</p>
              <p> Enter Count to import to Inventory : </p>
              <TextField
                            id="member-list" 
                            label=" "                              
                            type="number"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            onChange={handleCountChange}
                            helperText="Please enter import count"
                          />
            </Paper>  
          </Grid>
          <Grid item xs={12} md={4} lg={6}>  
            <Paper className={classes.paper} elevation={3}>
              <h3>Books Details</h3>
              <Details data={selectedValue!=null?selectedValue:{}}></Details>         
            </Paper>
          </Grid>
          </Grid> 
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <Button autoFocus onClick={checkoutData} color="primary" disabled={!importCount}>
            Import Book
          </Button>
        </DialogActions>
 
      </Dialog>
    );
  }
  
  BookImportDialog.propTypes = {
    onClose: PropTypes.func.isRequired,   
    onCheckoutData: PropTypes.func.isRequired,   
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired
  };