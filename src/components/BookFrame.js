import React from 'react';
import clsx from 'clsx';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';  
import {Paper,Grid,Typography,Container,Box} from '@material-ui/core';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';  
import {Link,Button,IconButton,Snackbar,TextField} from '@material-ui/core'; 
import {Menu,MenuItem} from '@material-ui/core'; 
import {Accordion,AccordionSummary,AccordionDetails} from '@material-ui/core';

import MoreVert from '@material-ui/icons/MoreVert'; 
import InfoDialog from './InfoDialog';
import BookUpdateDialog from'./BookUpdateDialog';
import BookIssueDialog from'./BookIssueDialog';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function preventDefault(event) {
  event.preventDefault();
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#" onClick={preventDefault}>
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

const useStyles = makeStyles((theme) => ({ 
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
    searchFixedHeight: {
        height: 150,
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
    const searchFixedHeight = clsx(classes.paper, classes.searchFixedHeight); 
    const [bookBagList, setBookBagList] = React.useState([]);
    const [bookList, setBookList] = React.useState([]);
    const [searchbookList, setSearchBookList] = React.useState([]);
    const [memberList, setMemberList] = React.useState([]);
    const [selectedMenuRow, setSelectedMenuRow] = React.useState();
    const [deleteopen, setDeleteopen] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
    const [updateDialogOpen, setUpdateDialogOpen] = React.useState(false);
    const [issueDialogOpen, setIssueDialogOpen] = React.useState(false);
    const [selectedInfoValue, setSelectedInfoValue] = React.useState(null); 
    const [searchParams, setSearchParams] = React.useState({}); 
    const [searchDisabled, setSearchDisabled] = React.useState(true); 
  
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
      const data = await checkOutBook({ userId, bookId }); 
       if(data["status"] == "success"){   
          getUpdatedMemberList()
          getUpdatedInventory()
          getUpdatedCheckBooks()
       } 
    }
    const updateSubmit = async (bookId,bookDetails) => {  
      const data = await updateBookDetails({ bookId,  bookDetails }); 
       if(data["status"] == "success"){   
        getUpdatedMemberList()
        getUpdatedInventory()
        getUpdatedCheckBooks() 
       } 
    }
    const checkinSubmit = async (userId,bookId,bagId) => {  
      const data = await checkin({ userId, bookId, bagId  }); 
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
      if(row["bag_item"]["status"]=="1")
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

    const searchBooks =()=>{
      let srch_param = searchParams["title"]?searchParams["title"]:""
      let auth_param = searchParams["authors"]?searchParams["authors"]:""
      fetch(process.env.REACT_APP_API_URL+'quickBookSearch'+"?book_q="+srch_param+"&auth_q="+auth_param)
      .then(results => results.json())
      .then(data => {  
          searchbookList.splice(0,searchbookList.length) 
          let bookrows=[] 
          data["booklist"].forEach((item) => { 
            bookrows.push(createData(item.book_item,item.inventory_item)); 
          });
          setSearchBookList(bookrows) 
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
    const handleParamChange=(event)=>{
      let id = (event.target.id).replace("-input","")      
      if(event.target.value=="")
        delete  searchParams[id]
      else searchParams[id]=event.target.value 
      setSearchDisabled(searchParams?(searchParams["title"]==undefined&&searchParams["authors"]==undefined):true)
    }

     
    function AllBooksMenu(){
      return (<Menu id="booklist-menu"  anchorEl={anchorE2}  keepMounted open={Boolean(anchorE2)} onClose={handleClose} >
         <MenuItem onClick={()=>{issuebook(selectedMenuRow)}}>Issue Book</MenuItem>
         <MenuItem onClick={()=>{updatebook(selectedMenuRow)}}>Update Book Info</MenuItem>
         <MenuItem onClick={()=> {deletebook(selectedMenuRow)}}>Delete this Book</MenuItem> 
       </Menu>);
     }

    return(
     <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}> 
        <Grid item xs={12} md={4} lg={12}>          
          <Accordion> 
            <AccordionSummary id="panel1a-header"  aria-controls="panel1a-content" expandIcon={<ExpandMoreIcon />}    >
              <Title>Quick Search</Title>
            </AccordionSummary>
            <AccordionDetails>
              <Grid item container>
                <Grid item xs={3}>
                  <TextField  id="title-input"  label="Title" variant="outlined"  type="text" onChange={handleParamChange} />
                </Grid>
                <Grid item xs={3}>
                  <TextField  id="authors-input"  label="Author"  variant="outlined" type="text" onChange={handleParamChange}/>                 
                </Grid>
                <Grid item xs={1}>
                  <Button variant="contained" lg color="primary" style={{height:"100%"}} disabled={searchDisabled} onClick={searchBooks}>
                  Search  
                  </Button>  
                  </Grid>
                <Grid item xs={3}>
                  <Button variant="contained" lg color="accent" style={{height:"100%"}} preventDefault onClick={()=>{setSearchBookList([])}}   >
                  Clear Search  
                  </Button>              
                </Grid> 
                <Grid item xs={2}> 
                  <Typography >{searchbookList.length +"  Search results"}</Typography>  
                </Grid>            
              </Grid> 
              
            </AccordionDetails>            
              <Grid item xs={12} md={4} lg={12}>
              {searchbookList.length==0?null:
                 <Paper className={fixedHeightPaper}>                      
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
                        {searchbookList.map((row) => (
                            
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
                </Paper>}
              </Grid>
          </Accordion> 
        </Grid>
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