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

export default function BookUpdateDialog(props) { 
    const { onClose, selectedValue, open, onCheckoutData,memberList } = props; 
    const [member, setMember] = React.useState( null);
    const classes = useStyles();  

    const Details = (prop)=>{    
      var pairs = [];
        for(var key in prop.data){
          pairs.push(<p>{key} : {prop.data[key]}</p>);
        } 
      return (
             <div className="Data-item">{pairs}</div>
      );
    }

    const MemberDetails = (prop)=>{    
      var pairs = [];
        for(var key in prop.data){
          pairs.push(<p>{key} : {prop.data[key]}</p>);
        } 
      return (
             <div className="Data-item">{pairs}</div>
      );
    }
    
    const checkoutData = () => {   
      let updateEntity=[]
      updateEntity["book_item"]=selectedValue["book_item"]
      updateEntity["selected_member"]=member 
      onCheckoutData(updateEntity)
      handleClose()
    };

    const handleClose = () => { 
            onClose();
    }; 

 

    const handleMemberChange = (event) => { 
      setMember(event.target.value);
    };
    const checkAvailable=()=>{
      return selectedValue?selectedValue["inventory_item"]["checkout_count"] <selectedValue["inventory_item"]["count"]:false
    }

    React.useEffect(() => { 
      setMember(memberList[0])
    },[]
    )
    return (
       
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" className={classes.root} open={open} fullWidth="md" maxWidth="md">
        <DialogTitle id="simple-dialog-title">Issue Book</DialogTitle>
        <IconButton aria-label="close" className={classes.closeButton}  onClick={handleClose}>
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>    
        <Grid container spacing={3}> 
        <Grid item xs={12} md={4} lg={6}> 
          {/* <Typography gutterBottom >  */}
          <Paper className={classes.paper} elevation={3}>
                        {!checkAvailable()?
                          <div>Copy Not Available</div> :
                            <div> 
                          <TextField
                            id="member-list"
                            select
                            label="Select Member"
                            value={member}
                            onChange={handleMemberChange}
                            helperText="Please select member"
                          >
                          {memberList.map((option) => (
                            <MenuItem key={option.id} value={option}>
                            {option.first_name +" "+ option.last_name}
                            </MenuItem>
                          ))
                          }
                          </TextField>
                          </div>
                          
                        }
                        </Paper>
                        <Paper className={classes.paper} elevation={3} style={{marginTop:"20px"}}>
                          <h3>Member Details</h3>
                        <MemberDetails data={member!=null?member:{}}>
                        </MemberDetails>   

                        </Paper>
          {/* </Typography> */}
          </Grid>
          <Grid item xs={12} md={4} lg={6}>  
            <Paper className={classes.paper} elevation={3}>
              <h3>Books Details</h3>
              <Details data={selectedValue!=null?selectedValue["book_item"]:{}}></Details>         
            </Paper>
          </Grid>
          </Grid> 
        </DialogContent>
        
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Close
          </Button>
          <Button autoFocus onClick={checkoutData} color="primary" disabled={member==null}>
            Issue Book
          </Button>
        </DialogActions>
 
      </Dialog>
    );
  }
  
  BookUpdateDialog.propTypes = {
    onClose: PropTypes.func.isRequired,   
    onCheckoutData: PropTypes.func.isRequired,   
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.object.isRequired,
    memberList: PropTypes.object.isRequired
  };