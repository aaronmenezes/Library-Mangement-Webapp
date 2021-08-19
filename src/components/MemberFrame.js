import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
 
import Title from './Title';
import Typography from '@material-ui/core/Typography'; 
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import IconButton from '@material-ui/core/IconButton';
import MoreVert from '@material-ui/icons/MoreVert';   
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MemberUpdateDialog from './MemberUpdateDialog';
import Snackbar from '@material-ui/core/Snackbar';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
  
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: '0 8px',
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: 'none',
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: 'hidden',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 450,
    },
  }));
  async function deleteMember(id) {
    let url = process.env.REACT_APP_API_URL+'deleteMember?memberId=' + id; 
    return fetch(url)  
      .then(data => data.json()) 
   }
  
  async function updateMemberDetails(details) {  
    return fetch(process.env.REACT_APP_API_URL+'updateMemberDetails', {
      method: 'POST',
      headers: {
        'mode':'no-cors',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
    .then(data => data.json()) 
   }

  function createMemberData(id,user_id,join_date,first_name,last_name,dob,role,debt) {  
    return {id,user_id,join_date,first_name,last_name,dob,role,debt};
  }

export default function MemberFrame() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 
  const [memberList, setMemberList] = React.useState([]);
  const [anchorE1, setAnchorE1] = React.useState(null);
  const [selectedMenuRow, setSelectedMenuRow] = React.useState();
  const [selectedInfoValue, setSelectedInfoValue] = React.useState(null); 
  const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
  const [deleteopen, setDeleteopen] = React.useState();

 
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+'getMemberList')
    .then(results => results.json())
    .then(data => {  
        memberList.splice(0,memberList.length)
        let memberRows=[]
        data["memberlist"].forEach((item) => {   
          memberRows.push(createMemberData(item.id,item.user_id,item.join_date,item.first_name,item.last_name,item.dob,item.role,item.debt));
        }); 
      setMemberList(memberRows) 
    });
    }, []);

    const updatemember = (row) => {  
      setSelectedInfoValue(row)
      setUpdateDialogOpen(true)    
      setAnchorE1(null);
    };
    const deletemember = (row) => {       
      deleteSubmit(row["id"])       
      setAnchorE1(null);
    };
    const handleMoreClick = (event,row) => {
      setSelectedMenuRow(row) 
      setAnchorE1(event.currentTarget);
    };

    const handleClose = (event,row) => {
      setAnchorE1(null);
      setUpdateDialogOpen(false);
      };

    function updateDialogData(data){   
      let dataid= data["id"]
      delete data.id;
      updateSubmit(dataid,data)
    };

    const updateSubmit = async (memberId,memberDetails) => {  
      const data = await updateMemberDetails({
        memberId,
        memberDetails
      }); 
        if(data["status"] == "success"){   
        // update lists
        } 
    }  

    const deleteSubmit = async (id) => {  
      const data = await deleteMember( id ); 
       if(data["status"] == "success"){   
        setDeleteopen(true)
       } 
    }

    function MemberMenu(){
      return (<Menu
            id="booklist-menu"
            anchorEl={anchorE1}
            keepMounted
            open={Boolean(anchorE1)}
            onClose={handleClose}
          >
            <MenuItem onClick={()=>{updatemember(selectedMenuRow)}} >Update Member Details</MenuItem>
            <MenuItem onClick={()=> {deletemember(selectedMenuRow)}}>Delete this member</MenuItem> 
          {/* <MenuItem onClick={()=>{issuebook(selectedMenuRow)}}>Issue Book</MenuItem>
          <MenuItem onClick={()=>{updatebook(selectedMenuRow)}}>Update Book Info</MenuItem>
          <MenuItem onClick={()=> {deletebook(selectedMenuRow)}}>Delete this Book</MenuItem>  */}
        </Menu>);
      }

    return(
    <Container maxWidth="lg" className={classes.container}>
           <Grid container spacing={3}> 
            <Grid item xs={12} md={4} lg={12}>
            <Paper className={fixedHeightPaper}>            
                    <Title>All Library Members </Title> 
                    <TableContainer className={classes.tablecontainer}>
                    <Table  stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>  </TableCell> 
                                <TableCell >User Id</TableCell>
                                <TableCell>First name</TableCell> 
                                <TableCell>Last Name</TableCell> 
                                <TableCell >DOB</TableCell> 
                                <TableCell >Role</TableCell> 
                                <TableCell >Debt</TableCell> 
                                <TableCell >DOJ</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {memberList.map((row) => (
                            
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton onClick={(event ) => {handleMoreClick(event, row) }}> 
                                        <MoreVert/>
                                    </IconButton>
                                    <MemberMenu/>
                                </TableCell> 
                                <TableCell>  {row.user_id}  </TableCell>
                                <TableCell>{row.first_name}</TableCell> 
                                <TableCell>{row.last_name}</TableCell> 
                                <TableCell>{row.dob}</TableCell> 
                                <TableCell>{row.role}</TableCell> 
                                <TableCell>{row.debt}</TableCell> 
                                <TableCell>{row.join_date}</TableCell>  
                            </TableRow>
                        ))}
                        </TableBody> 
                    </Table> 
                    </TableContainer> 
            </Paper>
            </Grid>
            </Grid>
            <MemberUpdateDialog selectedValue={selectedInfoValue} open={updateDialogOpen}  onClose={handleClose} onUpdateData={updateDialogData} />            
          <Box pt={4}>
            <Copyright />
          </Box>
          <Snackbar
            anchorOrigin={{vertical: 'top', horizontal: 'center' }}
            open={deleteopen} 
            message="Book Deleted Successfully"
            autoHideDuration={1000}
            key="topcenter"
        />
     </Container>
  )
}