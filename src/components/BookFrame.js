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

  function createData(isbn, title, authors, publisher, publication_date,average_rating,num_pages,language_code,ratings_count,text_reviews_count,isbn13,count,checkout_count) {
    return {isbn, title, authors, publisher, publication_date,average_rating,num_pages,language_code,ratings_count,text_reviews_count,isbn13,count,checkout_count };
  }

  function createBagData(isbn,name,authors,  first_name, last_name,  checkout_date) { 
    return {isbn,name,authors,first_name, last_name,  checkout_date };
  }
  
  const bookrows = [];  
  const bagrows = [];    

export default function BookFrame() {
    const classes = useStyles(); 
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 

    function handleMoreClick (item){
            console.log(item) 
      };

    React.useEffect(() => {
        fetch('http://localhost:8080/getBooksInventory')
          .then(results => results.json())
          .then(data => {
              console.log(data["booklist"])
              data["booklist"].forEach((item) => { 
                bookrows.push(createData(item.book_item.isbn, item.book_item.title, item.book_item.authors,
                  item.book_item.publisher, item.book_item.publication_date, item.book_item.average_rating,
                  item.book_item.num_pages, item.book_item.language_code, item.book_item.ratings_count,
                  item.book_item.text_reviews_count, item.book_item.isbn13,item.inventory_item.count,item.inventory_item.checkout_count)); 
            });
          });
      }, []);
    React.useEffect(() => {
        fetch('http://localhost:8080/getCheckedBooks')
        .then(results => results.json())
        .then(data => { 
        data["booklist"].forEach((item) => {   
            bagrows.push(createBagData(item.bag_item.bookID, item.book_item.title, item.book_item.authors,  item.member_item.first_name, item.member_item.last_name, item.bag_item.checkout_date)); 
           });
        });
    }, []);

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
                                    <TableCell width="40%"> Checkout Date </TableCell> 
                                    <TableCell width="15%"> ISBN</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {bagrows.map((row) => (
                                
                                <TableRow key={row.id}>
                                    <TableCell  width="5%">
                                        <IconButton onClick={ ()=>handleMoreClick(row)}> 
                                            <MoreVert/>
                                        </IconButton>
                                    </TableCell> 
                                    <TableCell width="30%">{row.name}</TableCell>
                                    <TableCell width="20%">{row.authors}</TableCell> 
                                    <TableCell width="20%">{row.first_name + " " +row.last_name}</TableCell> 
                                    <TableCell width="10%">{row.checkout_date}</TableCell> 
                                    <TableCell width="15%">{row.isbn}</TableCell>  
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
                            
                            <TableRow key={row.id}>
                                <TableCell>
                                    <IconButton onClick={ ()=>handleMoreClick(row)}> 
                                        <MoreVert/>
                                    </IconButton>
                                </TableCell> 
                                <TableCell width="30%">  {row.title}  </TableCell>
                                <TableCell>{row.authors}</TableCell> 
                                <TableCell>{row.publisher}</TableCell> 
                                <TableCell>{row.publication_date}</TableCell> 
                                <TableCell>{row.count}</TableCell> 
                                <TableCell>{row.checkout_count}</TableCell> 
                                <TableCell>{row.isbn}</TableCell>  
                            </TableRow>
                        ))}
                        </TableBody> 
                    </Table> 
                    </TableContainer>
                </Paper>
            </Grid>

            </Grid>
                    
        <Box pt={4}>
            <Copyright />
        </Box>
     </Container>
    )
}