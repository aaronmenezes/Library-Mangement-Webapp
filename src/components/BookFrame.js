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
      height: 600,
    },
    panelHeight1: {
        height: 400,
    },
    tablecontainer1:{
        maxHeight: 300,
    },
  }));

  function createData(isbn, title, authors, publisher, publication_date,average_rating,num_pages,language_code,ratings_count,text_reviews_count,isbn13) {
    return {isbn, title, authors, publisher, publication_date,average_rating,num_pages,language_code,ratings_count,text_reviews_count,isbn13 };
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
        fetch('http://localhost:8080/getAllBooks')
          .then(results => results.json())
          .then(data => {
              console.log(data["booklist"])
              data["booklist"].forEach((item) => { 
                bookrows.push(createData(item.isbn, item.title, item.authors, item.publisher, item.publication_date, item.average_rating, item.num_pages, item.language_code, item.ratings_count, item.text_reviews_count, item.isbn13)); 
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
            <Grid item xs={12} md={4} lg={6}>
                <Paper className={classes.panelHeight1}> 
                    <Title>Issued Books </Title>            
                        <TableContainer className={classes.tablecontainer1}>
                        <Table  stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>  </TableCell> 
                                    <TableCell> Title </TableCell>
                                    <TableCell> authors </TableCell> 
                                    <TableCell> Members Name </TableCell> 
                                    <TableCell> Checkout Date </TableCell> 
                                    <TableCell> ISBN</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {bagrows.map((row) => (
                                
                                <TableRow key={row.id}>
                                    <TableCell>
                                        <IconButton onClick={ ()=>handleMoreClick(row)}> 
                                            <MoreVert/>
                                        </IconButton>
                                    </TableCell> 
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell>{row.authors}</TableCell> 
                                    <TableCell>{row.first_name}</TableCell> 
                                    <TableCell>{row.checkout_date}</TableCell> 
                                    <TableCell>{row.isbn}</TableCell>  
                                </TableRow>
                            ))}
                            </TableBody> 
                        </Table> 
                        </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={6}>
                <Paper className={classes.panelHeight1}> 
                    <Title>Avialable Books </Title>            
                        <TableContainer className={classes.tablecontainer1}>
                        <Table  stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>  </TableCell> 
                                    <TableCell width="30%"> Title </TableCell>
                                    <TableCell> Authors </TableCell> 
                                    <TableCell> Publisher </TableCell> 
                                    <TableCell> Publication_date </TableCell> 
                                    <TableCell> ISBN</TableCell>  
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {bagrows.map((row) => (
                                
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
                                    <TableCell>{row.isbn}</TableCell>  
                                </TableRow>
                            ))}
                            </TableBody> 
                        </Table> 
                        </TableContainer>
                </Paper>
            </Grid>
            <Grid item xs={12} md={8} lg={12}>
                <Paper className={fixedHeightPaper}>            
                    <Title>Books </Title>            
                    <TableContainer className={classes.tablecontainer}>
                    <Table  stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>  </TableCell> 
                                <TableCell width="30%"> Title </TableCell>
                                <TableCell> Authors </TableCell> 
                                <TableCell> Publisher </TableCell> 
                                <TableCell> Publication_date </TableCell> 
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
                                <TableCell>{row.isbn}</TableCell>  
                            </TableRow>
                        ))}
                        </TableBody> 
                    </Table> 
                    </TableContainer>
                </Paper>
            </Grid>


                    
            <Box pt={4}>
                <Copyright />
            </Box>
        </Grid>
     </Container>
    )
}