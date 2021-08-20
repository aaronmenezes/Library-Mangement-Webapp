import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
 
import Title from './Title';
import {Paper,Grid,Typography,Container,Box} from '@material-ui/core';
import {Table ,TableBody ,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';  
import {Link, IconButton,Snackbar,Fab} from '@material-ui/core'; 
import {Menu ,MenuItem} from '@material-ui/core';     
import MoreVert from '@material-ui/icons/MoreVert';   
import AddIcon from '@material-ui/icons/Add'; 
import MemberUpdateDialog from './MemberUpdateDialog';
import MemberInsertDialog from './MemberInsertDialog'; 

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
} 
const useStyles = makeStyles((theme) => ({ 
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
      height: 600,
    }, 
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));

  async function deleteMember(id) {
    let url = process.env.REACT_APP_API_URL+'deleteMember?memberId=' + id; 
    return fetch(url).then(data => data.json()) 
   }
   async function insertMemberDetails(details){
    return fetch(process.env.REACT_APP_API_URL+'signup', {
      method: 'POST',
      headers: {
        'mode':'no-cors',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details)
    })
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
  const [insertDialogOpen, setInsertDialogOpen] = React.useState(false);
  const [deleteopen, setDeleteopen] = React.useState();

 
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+'getMemberList')
    .then(results => results.json())
    .then(data => {  updateMemberList(data) })}, []);

    const updateMemberList =(data)=>{
      memberList.splice(0,memberList.length)
      let memberRows=[]
      data["memberlist"].forEach((item) => {   
        memberRows.push(createMemberData(item.id,item.user_id,item.join_date,item.first_name,item.last_name,item.dob,item.role,item.debt));
      }); 
       setMemberList(memberRows) 
    }

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

    const handleAddMember = (event)=>{
      setInsertDialogOpen(true)
    }
    const handleClose = (event,row) => {
      setAnchorE1(null);
      setUpdateDialogOpen(false);
      setInsertDialogOpen(false);
      };

    function updateDialogData(data){   
      let dataid= data["id"]
      delete data.id;
      updateSubmit(dataid,data)
    };

    function insertDialogData(data){   
      insertSubmit(data.user_id,data.psswd,data.first_name,data.last_name,data.dob)
    };

    const updateSubmit = async (memberId,memberDetails) => {  
      const data = await updateMemberDetails({memberId, memberDetails }); 
      updateMemberList(data)
    }  
    const insertSubmit = async (user_id,psswd,first_name,last_name,dob) => {  
      const data = await insertMemberDetails({ user_id,psswd,first_name,last_name,dob  }); 
      updateMemberList(data)
    }  

    const deleteSubmit = async (id) => {  
      const data = await deleteMember( id ); 
       updateMemberList(data)
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
                      <TableCell> 
                        <Fab color="secondary" aria-label="add" onClick={(event ) => {handleAddMember(event) }}> 
                        <AddIcon />
                        </Fab>
                      </TableCell> 
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
            <MemberInsertDialog open={insertDialogOpen}  onClose={handleClose} onInsertData={insertDialogData} />            
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