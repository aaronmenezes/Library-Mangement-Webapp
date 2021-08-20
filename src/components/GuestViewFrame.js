import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles'; 
import Title from './Title'; 
import {Paper,Grid,Typography,Container,Box,Link} from '@material-ui/core'; 
import {Table ,TableBody ,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';   

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
 

export default function GuestViewFrame() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 
  const [bookList, setBookList] = React.useState([]); 

 
  React.useEffect(() => {
    fetch(process.env.REACT_APP_API_URL+'getBooksInventory')
    .then(results => results.json())
    .then(data => {  updateMemberList(data) })}, []);

    const updateMemberList =(data)=>{
        bookList.splice(0,bookList.length)  
        setBookList(data["booklist"]) 
  }


  return(
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}> 
        <Grid item xs={12} md={4} lg={12}>      
          <Paper className={fixedHeightPaper}>            
            <Title>All Library Books </Title>             
            <TableContainer className={classes.tablecontainer}>
            <Table  stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow> 
                    <TableCell>  Book ID </TableCell> 
                    <TableCell> Title </TableCell> 
                    <TableCell> Authors  </TableCell> 
                    <TableCell> Publisher </TableCell> 
                    <TableCell>  Publication date </TableCell> 
                    <TableCell>  Num pages  </TableCell> 
                    <TableCell>  Average rating  </TableCell> 
                    <TableCell>  Ratings count  </TableCell> 
                    <TableCell>  Text Reviews Count  </TableCell> 
                    <TableCell> Language code  </TableCell> 
                    <TableCell>  isbn </TableCell>  
                    <TableCell> isbn13 </TableCell> 
                  </TableRow>
                </TableHead>
                <TableBody>
                {bookList.map((row) => ( 
                  <TableRow key={row.book_item.bookID}>                                
                    <TableCell  >  {row.book_item.bookID}  </TableCell> 
                    <TableCell>  {row.book_item.title}  </TableCell> 
                    <TableCell>  {row.book_item.authors}  </TableCell> 
                    <TableCell>  {row.book_item.publisher}  </TableCell> 
                    <TableCell>  {row.book_item.publication_date}  </TableCell> 
                    <TableCell>  {row.book_item.num_pages}  </TableCell> 
                    <TableCell>  {row.book_item.average_rating}  </TableCell> 
                    <TableCell>  {row.book_item.ratings_count}  </TableCell> 
                    <TableCell>  {row.book_item.text_reviews_count}  </TableCell> 
                    <TableCell>  {row.book_item.language_code}  </TableCell> 
                    <TableCell>  {row.book_item.isbn}  </TableCell>  
                    <TableCell>  {row.book_item.isbn13}  </TableCell>
                  </TableRow>
                ))}
                </TableBody> 
              </Table> 
            </TableContainer> 
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}> <Copyright /> </Box>      
    </Container>
  )
}