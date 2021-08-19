import React from 'react';
import clsx from 'clsx';

import Title from './Title';
import { makeStyles } from '@material-ui/core/styles'; 
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
import Snackbar from '@material-ui/core/Snackbar';
import InfoDialog from './InfoDialog';
import BookUpdateDialog from'./BookUpdateDialog';
import BookIssueDialog from'./BookIssueDialog';


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
  
async function deleteBook(bookId) {
  let url = process.env.REACT_APP_API_URL+'deleteBook?bookId=' + bookId; 
  return fetch(url)  
    .then(data => data.json()) 
 }

async function checkin(checkindetils) {
  return fetch(process.env.REACT_APP_API_URL+'checkin', {
    method: 'POST',
    headers: {
      'mode':'no-cors',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(checkindetils)
  })
    .then(data => data.json()) 
 }

 async function updateBookDetails(details) {  
  return fetch(process.env.REACT_APP_API_URL+'updateBookDetails', {
    method: 'POST',
    headers: {
      'mode':'no-cors',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  })
  .then(data => data.json()) 
 }
  
 async function checkOutBook(details) { 
  return fetch(process.env.REACT_APP_API_URL+'checkout', {
    method: 'POST',
    headers: {
      'mode':'no-cors',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  })
  .then(data => data.json()) 
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
    tablecontainer:{
        maxHeight: 500,
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

  function createData(book_item, inventory_item) {
    return {book_item, inventory_item};
  }

  function createBagData(book_item,bag_item,member_item) { 
    return {book_item,bag_item,member_item};
  }
  function createMemberData(id,user_id,join_date,first_name,last_name,dob,role,debt) {  
    return {id,user_id,join_date,first_name,last_name,dob,role,debt};
  }
    

export default function BookFrame() {
    const classes = useStyles(); 
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 
    const [bookBagList, setBookBagList] = React.useState([]);
    const [bookList, setBookList] = React.useState([]);
    const [memberList, setMemberList] = React.useState([]);
    const [selectedMenuRow, setSelectedMenuRow] = React.useState();
    const [deleteopen, setDeleteopen] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [issueDialogOpen, setIssueDialogOpen] = React.useState(false);
    const [selectedInfoValue, setSelectedInfoValue] = React.useState(null); 
  
    const handleClose = () => {
      setAnchorEl(null);
      setAnchorE2(null);
      setInfoDialogOpen(false)
      setUpdateDialogOpen(false)
      setIssueDialogOpen(false)
    };

    function updateDialogData(data){   
      let dataid= data["bookID"]
      delete data.bookID;
      updateSubmit(dataid,data)
    };
  
    function issueDialogData(data){ 
      checkoutsubmit(data.selected_member.id,data.book_item.bookID)
    };

    const handleMoreClick = (event,row) => {
      setSelectedMenuRow(row) 
      setAnchorEl(event.currentTarget);
    };
    const handleAllMoreClick = (event,row) => {
      setSelectedMenuRow(row) 
      setAnchorE2(event.currentTarget);
    };

    const checkoutsubmit = async (userId,bookId) => {  
      const data = await checkOutBook({
        userId,
        bookId
      }); 
       if(data["status"] == "success"){   
          getUpdatedMemberList()
          getUpdatedInventory()
          getUpdatedCheckBooks()
       } 
    }
    const updateSubmit = async (bookId,bookDetails) => {  
      const data = await updateBookDetails({
        bookId,
        bookDetails
      }); 
       if(data["status"] == "success"){   
        getUpdatedMemberList()
        getUpdatedInventory()
        getUpdatedCheckBooks() 
       } 
    }
    const checkinSubmit = async (userId,bookId,bagId) => {  
      const data = await checkin({
        userId,
        bookId,
        bagId
      }); 
       if(data["status"] == "success"){  
        getUpdatedMemberList()
        getUpdatedInventory()
        getUpdatedCheckBooks()
       } 
    }
    const deleteSubmit = async (bookId) => {  
      const data = await deleteBook( bookId ); 
       if(data["status"] == "success"){   
        setDeleteopen(true)
       } 
    }

    const deletebook = (row) => {       
      deleteSubmit(row["book_item"]["bookID"])       
      setAnchorE2(null);
    };

    const returnbook = (row) => {   
      checkinSubmit(row["member_item"]["id"],row["book_item"]["bookID"],row["bag_item"]["bagId"])       
      setAnchorEl(null);
    };
  
    const updatebook = (row) => {  
      setSelectedInfoValue(row)
      setUpdateDialogOpen(true)    
      setAnchorE2(null);
    };
    const issuebook = (row) => {  
      setSelectedInfoValue(row)
      setIssueDialogOpen(true)    
      setAnchorE2(null);
    };
    const showBookInfo = (row) => { 
      setSelectedInfoValue(row)
      setInfoDialogOpen(true)
      setAnchorE2(null);
    };

    const getUpdatedCheckBooks = ()=>{
      fetch(process.env.REACT_APP_API_URL+'getCheckedBooks')
      .then(results => results.json())
      .then(data => { 
        bookBagList.splice(0,bookBagList.length)
        let bagrows=[]
        data["booklist"].forEach((item) => {   
          bagrows.push(createBagData(  item.book_item,item.bag_item,item.member_item)); 
         });
         setBookBagList(bagrows)
      });    
    }
    const getUpdatedInventory = ()=>{ 
      fetch(process.env.REACT_APP_API_URL+'getBooksInventory')
      .then(results => results.json())
      .then(data => {
        bookList.splice(0,bookList.length)
        let bookrows=[] 
          data["booklist"].forEach((item) => { 
            bookrows.push(createData(item.book_item,item.inventory_item)); 
        });
      setBookList(bookrows) 
      });
    }

    const getUpdatedMemberList =()=>{
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
    }
    React.useEffect(() => { getUpdatedCheckBooks ()}, []);
    
    React.useEffect(() => {getUpdatedInventory ()}, []);
   
    React.useEffect(() => {getUpdatedMemberList()}, []);

    function CheckoutMenu(){
     return (<Menu
          id="issuebook-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
        <MenuItem onClick={()=>{returnbook(selectedMenuRow)}}>Return Book</MenuItem>
        <MenuItem onClick={()=> {showBookInfo(selectedMenuRow)}}>See All Info</MenuItem> 
      </Menu>);
    }

    function AllBooksMenu(){
      return (<Menu
           id="booklist-menu"
           anchorEl={anchorE2}
           keepMounted
           open={Boolean(anchorE2)}
           onClose={handleClose}
         >
         <MenuItem onClick={()=>{issuebook(selectedMenuRow)}}>Issue Book</MenuItem>
         <MenuItem onClick={()=>{updatebook(selectedMenuRow)}}>Update Book Info</MenuItem>
         <MenuItem onClick={()=> {deletebook(selectedMenuRow)}}>Delete this Book</MenuItem> 
       </Menu>);
     }

    return(
     <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}> 
            <Grid item xs={12} md={4} lg={12}>
            <Paper className={fixedHeightPaper}>            
                    <Title>Checked Books </Title>            
                      <TableContainer className={classes.tablecontainer}>
                        <Table  stickyHeader aria-label="sticky table">
                          <TableHead>
                                <TableRow>
                                    <TableCell width="5%">  </TableCell> 
                                    <TableCell width="30%"> Title </TableCell>
                                    <TableCell width="20%"> Authors </TableCell> 
                                    <TableCell width="20%"> Member</TableCell> 
                                    <TableCell width="10%"> Status </TableCell> 
                                    <TableCell width="30%"> Issue Date </TableCell> 
                                    <TableCell width="40%"> ReturnDate </TableCell> 
                                    <TableCell width="15%"> ISBN</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {bookBagList.map((row) => (
                                
                                <TableRow key={row.bag_item.bagId}>
                                    <TableCell  width="5%">
                                        <IconButton aria-controls="simple-menu" aria-haspopup="true"  onClick={(event ) => {handleMoreClick(event, row) }}> 
                                            <MoreVert/>
                                        </IconButton>
                                        <CheckoutMenu></CheckoutMenu>
                                    </TableCell> 
                                    <TableCell width="30%">{row.book_item.title}</TableCell>
                                    <TableCell width="20%">{row.book_item.authors}</TableCell> 
                                    <TableCell width="20%">{row.member_item.first_name + " " +row.member_item.last_name}</TableCell> 
                                    <TableCell width="10%">{row.bag_item.status==1?"Issued":"Returned"}</TableCell> 
                                    <TableCell width="30%">{row.bag_item.checkout_date}</TableCell> 
                                    <TableCell width="40%">{row.bag_item.checkin_date?row.bag_item.checkin_date:"-"}</TableCell> 
                                    <TableCell width="10%">{row.book_item.isbn}</TableCell>  
                                </TableRow>
                            ))}
                            </TableBody> 
                        </Table> 
                        </TableContainer>
                </Paper>
            </Grid>
             
            <Grid item xs={12} md={8} lg={12}>
                <Paper className={fixedHeightPaper}>            
                    <Title>All Books </Title>            
                    <TableContainer className={classes.tablecontainer}>
                    <Table  stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>  </TableCell> 
                                <TableCell width="30%"> Title </TableCell>
                                <TableCell> Authors </TableCell> 
                                <TableCell> Publisher </TableCell> 
                                <TableCell width="20%"> Publication date </TableCell> 
                                <TableCell width="15%"> No. of books </TableCell> 
                                <TableCell width="15%"> No. Issued books </TableCell> 
                                <TableCell width="5%"> ISBN</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {bookList.map((row) => (
                            
                            <TableRow key={row.book_item.isbn}>
                                <TableCell>
                                    <IconButton onClick={(event ) => {handleAllMoreClick(event, row) }}> 
                                        <MoreVert/>
                                    </IconButton>
                                    <AllBooksMenu/>
                                </TableCell> 
                                <TableCell  >  {row.book_item.title}  </TableCell>
                                <TableCell>{row.book_item.authors}</TableCell> 
                                <TableCell>{row.book_item.publisher}</TableCell> 
                                <TableCell>{row.book_item.publication_date}</TableCell> 
                                <TableCell>{row.inventory_item.count}</TableCell> 
                                <TableCell>{row.inventory_item.checkout_count}</TableCell> 
                                <TableCell>{row.book_item.isbn}</TableCell>  
                            </TableRow>
                        ))}
                        </TableBody> 
                    </Table> 
                    </TableContainer>
                </Paper>
            </Grid>

            </Grid>
        <InfoDialog selectedValue={selectedInfoValue} open={infoDialogOpen} onClose={handleClose} />          
        <BookUpdateDialog selectedValue={selectedInfoValue} open={updateDialogOpen}  onClose={handleClose} onUpdateData={updateDialogData} />            
        <BookIssueDialog selectedValue={selectedInfoValue} memberList={memberList} open={issueDialogOpen}  onClose={handleClose} onCheckoutData={issueDialogData} />            
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