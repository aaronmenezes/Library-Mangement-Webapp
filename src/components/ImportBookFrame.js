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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table'; 
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';  
import IconButton from '@material-ui/core/IconButton';
import AddCircle from '@material-ui/icons/AddCircle';
import Info from '@material-ui/icons/Info';    
import BookInfoDialog from './BookInfoDialog';
import BookImportDialog from './BookImportDialog';

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
    searchFixedHeight: {
        height: 200,
      }, 
    extendedIcon: {
      marginRight: theme.spacing(1),
    },
  }));
 
   async function insertList(){
    
  } 
  
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
  
    const importlist = async () => {   
      fetch(process.env.REACT_APP_API_URL+'getApiBookList')
        .then(data => data.json())  
        .then(data=>{
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
        bookImportList.splice(0,bookImportList.length) 
        setBookImportList(data)
    };
    const showInfoDialog = (event, row)=>{
        setSelectedInfoValue(row)
        setInfoDialogOpen(true) 
    }
    const showImportDialog = (event, row)=>{
        setSelectedInfoValue(row)
        setImportDialogOpen(true) 
    }
    return(
    <Container maxWidth="lg" className={classes.container}>
           <Grid container spacing={3}>             
                <Grid item xs={12} md={4} lg={12}>            
                    <Paper className={searchFixedHeight}>            
                        <Title>Import Books from Frappe </Title> 
                        <Button variant="contained" color="primary" onClick={importlist}> Import  </Button>
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