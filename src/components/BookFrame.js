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
import InfoDialog from './InfoDialog';


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
async function checkin(checkindetils) {
  return fetch('http://localhost:8080/checkin', {
    method: 'POST',
    headers: {
      'mode':'no-cors',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(checkindetils)
  })
    .then(data => data.json()) 
 }
  
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
  
  const bookrows = [];  
  const bagrows = [];    

export default function BookFrame() {
    const classes = useStyles(); 
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 
    const [selectedMenuRow, setSelectedMenuRow] = React.useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorE2, setAnchorE2] = React.useState(null);
    const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
    const [selectedInfoValue, setSelectedInfoValue] = React.useState(null);
   
    const handleClick = (event) => {
      setAnchorE2(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setAnchorE2(null);
      setInfoDialogOpen(false)
    };
  
    const handleMoreClick = (event,row) => {
      setSelectedMenuRow(row)
      console.log(row)
      setAnchorEl(event.currentTarget);
    };

    const checkinSubmit = async (userId,bookId) => { 
      console.log(userId,bookId)
      const data = await checkin({
        userId,
        bookId
      });
      console.log(data)
       if(data["status"] == "success"){   
        // update lists
       } 
    }

    const updatebook = (row) => {  
      //checkinSubmit(row["memberID"],row["isbn"])       
      setAnchorE2(null);
    };

    const deletebook = (row) => { 
      console.log(row)
      //checkinSubmit(row["memberID"],row["isbn"])       
      setAnchorE2(null);
    };

    const returnbook = (row) => { 
      console.log(row)
      checkinSubmit(row["memberID"],row["isbn"])       
      setAnchorEl(null);
    };
  
    const showBookInfo = (row) => {
      console.log(row)
      setSelectedInfoValue(row)
      setInfoDialogOpen(true)
    };

    React.useEffect(() => {
        fetch('http://localhost:8080/getBooksInventory')
          .then(results => results.json())
          .then(data => {
            bookrows.splice(0,bookrows.length)
              console.log(data["booklist"]) 
              data["booklist"].forEach((item) => { 
                bookrows.push(createData(item.book_item,item.inventory_item)); 
            });
          });
      }, []);
    React.useEffect(() => {
        fetch('http://localhost:8080/getCheckedBooks')
        .then(results => results.json())
        .then(data => { 
          bagrows.splice(0,bagrows.length)
        data["booklist"].forEach((item) => {   
            bagrows.push(createBagData(  item.book_item,item.bag_item,item.member_item)); 
           });
        });
    }, []);

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
                            {bagrows.map((row) => (
                                
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
                                <TableCell> Publication date </TableCell> 
                                <TableCell> No. of books </TableCell> 
                                <TableCell> No. Issued books </TableCell> 
                                <TableCell> ISBN</TableCell>  
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {bookrows.map((row) => (
                            
                            <TableRow key={row.book_item.isbn}>
                                <TableCell>
                                    <IconButton onClick={handleClick}> 
                                        <MoreVert/>
                                    </IconButton>
                                    <AllBooksMenu/>
                                </TableCell> 
                                <TableCell width="30%">  {row.book_item.title}  </TableCell>
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
        <Box pt={4}>
            <Copyright />
        </Box>
     </Container>
    )
}