import React from 'react';
import clsx from 'clsx';
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';  
import {Paper,Grid,Typography,Container,Box} from '@material-ui/core';
import {Table,TableBody,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';  
import {Link,IconButton} from '@material-ui/core'; 
import {TextField,Button, ButtonGroup} from '@material-ui/core';  
import {AddCircle,Info} from '@material-ui/icons';  
import BookInfoDialog from './BookInfoDialog';
import BookImportDialog from './BookImportDialog';

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
    height: 450,
  }, 
  searchFixedHeight: {
      height: 200,
    }, 
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  formgrid:{ 
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .Button-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  }
}));

async function importBookToSystem(details) {  
  return fetch(process.env.REACT_APP_API_URL+'addBooksToSystem', {
    method: 'POST',
    headers: {
      'mode':'no-cors',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(details)
  })
  .then(data => data.json()) 
  }

export default function ImportBookFrame() {
  const classes = useStyles();
  const searchFixedHeight = clsx(classes.paper, classes.searchFixedHeight); 
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeightPaper);  
  const [bookImportList, setBookImportList] = React.useState([]);   
  const [selectedInfoValue, setSelectedInfoValue] = React.useState(null); 
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  const [importDialogOpen, setImportDialogOpen] = React.useState(false); 
  const [searchParams, setSearchParams] = React.useState({}); 

  const importlist = async () => {
    let queryString="?"
    for(var key in searchParams){ 
        queryString += key+"="+searchParams[key]
        queryString +="&&" 
    } 
    console.log(queryString)
    fetch(process.env.REACT_APP_API_URL+'getApiBookList'+queryString)
      .then(data => data.json())  
      .then(data=>{
          console.log(data)
            bookImportList.splice(0,bookImportList.length) 
          setBookImportList(data)
      })
  }  
    
  const handleClose = () => { 
      setInfoDialogOpen(false) 
      setImportDialogOpen(false) 
  };
  const importDialogData = async (book_data)=>{  
      const data = await importBookToSystem({"import_book":book_data})
      if(data["status"]=="success")
          importlist()
  };
  const showInfoDialog = (event, row)=>{
      setSelectedInfoValue(row)
      setInfoDialogOpen(true) 
  }
  const showImportDialog = (event, row)=>{
      setSelectedInfoValue(row)
      setImportDialogOpen(true) 
  }
  const handleParamChange=(event)=>{
    let id = (event.target.id).replace("-input","")      
    if(event.target.value=="")
    delete  searchParams[id]
    else searchParams[id]=event.target.value
    console.log(searchParams)
  }
  return(
   <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>             
        <Grid item xs={12} md={4} lg={12}>            
          <Paper className={searchFixedHeight}>            
            <Title>Import Books from Frappe </Title>
              <div className={classes.formgrid}>
              <TextField  id="title-input"  label="Title"   type="text" onChange={handleParamChange} />
              <TextField  id="authors-input"  label="Author"   type="text" onChange={handleParamChange}/>
              <TextField  id="publisher-input"  label="Publisher"  type="text" onChange={handleParamChange} />
              <TextField  id="isbn-input"  label="isbn"  type="numer" onChange={handleParamChange}/>
              <TextField  id="page-input"  label="Page"  type="number" onChange={handleParamChange} />
            </div>
            
            <Button variant="contained" 
              color="primary"
                style={{width:"20%",marginTop:"20px"}}
                onClick={importlist}>
              Search  
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} lg={12}>            
          <Paper className={fixedHeightPaper}>            
            <Title>Books from Frappe</Title> 
            
            <TableContainer disableElevation className={classes.tablecontainer}>
            <Table  stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>  
                    <TableCell>  </TableCell> 
                    <TableCell width="30%"> Title </TableCell>
                    <TableCell> Authors </TableCell> 
                    <TableCell> Publisher </TableCell> 
                    <TableCell width="20%"> Publication date </TableCell> 
                    <TableCell width="15%"> Inventory Count </TableCell>  
                    <TableCell width="5%"> ISBN </TableCell>  
                </TableRow> 
              </TableHead>
              <TableBody>
                {bookImportList.map((row) => (                  
                <TableRow key={row.bookID}>
                  <TableCell>
                  <ButtonGroup  disableElevation  aria-label="outlined primary button group">
                    <IconButton  onClick={(event ) => {showInfoDialog(event, row) }}> 
                        <Info/>
                    </IconButton> 
                    <IconButton  onClick={(event ) => {showImportDialog(event, row) }}> 
                        <AddCircle/>
                    </IconButton> 
                    </ButtonGroup>
                  </TableCell> 
                  <TableCell>{row.title} </TableCell>
                  <TableCell>{row.authors}</TableCell> 
                  <TableCell>{row.publisher}</TableCell> 
                  <TableCell>{row.publication_date}</TableCell> 
                  <TableCell>{row.inventory_count}</TableCell>  
                  <TableCell>{row.isbn}</TableCell>  
                </TableRow>
              ))}
              </TableBody> 
            </Table> 
            </TableContainer> 
          </Paper>
        </Grid>
      </Grid>
      <BookInfoDialog selectedValue={selectedInfoValue} open={infoDialogOpen} onClose={handleClose} />
      <BookImportDialog selectedValue={selectedInfoValue} open={importDialogOpen}  onClose={handleClose} onCheckoutData={importDialogData} />     
      <Box pt={4}>
        <Copyright />
      </Box> 
    </Container>
  )
}