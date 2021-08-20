import React from 'react'; 
import clsx from 'clsx';    
import PropTypes from 'prop-types'; 
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles'; 
import {Table ,TableBody ,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';  
import {Link, IconButton} from '@material-ui/core'; 
import {Menu ,MenuItem} from '@material-ui/core'; 
import MoreVert from '@material-ui/icons/MoreVert'; 
import InfoDialog from './InfoDialog';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
    
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
 

function createBagData(book_item,bag_item,member_item) { 
  return {book_item,bag_item,member_item};
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

export default function DashTileIssued(props) {
  const { categorySwitch } = props;
  const classes = useStyles();
  const [bookBagList, setBookBagList] = React.useState([]);
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight); 
  const [selectedMenuRow, setSelectedMenuRow] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorE2, setAnchorE2] = React.useState(null);
  const [infoDialogOpen, setInfoDialogOpen] = React.useState(false);
  const [selectedInfoValue, setSelectedInfoValue] = React.useState(null); 
  React.useEffect(() => { getUpdatedCheckBooks ()}, []);

    const handleClose = () => {
      setAnchorEl(null); 
      setAnchorE2(null); 
      setInfoDialogOpen(false);
    };
  const getUpdatedCheckBooks = ()=>{
    fetch(process.env.REACT_APP_API_URL+'getCheckedBooks')
    .then(results => results.json())
    .then(data => { 
      bookBagList.splice(0,bookBagList.length)
      let bagrows=[]
      data["booklist"].forEach((item) => {   
        if(item.bag_item.status)
          bagrows.push(createBagData(  item.book_item,item.bag_item,item.member_item)); 
       });
       setBookBagList(bagrows)
    });    
  }

  const handleMoreClick = (event,row) => {
    setSelectedMenuRow(row) 
    setAnchorEl(event.currentTarget);
  };

  const showBookInfo = (row) => { 
    setSelectedInfoValue(row)
    setInfoDialogOpen(true)
    setAnchorE2(null);
  };

  const returnbook = (row) => {   
    checkinSubmit(row["member_item"]["id"],row["book_item"]["bookID"],row["bag_item"]["bagId"])       
    setAnchorEl(null);
  };
  const checkinSubmit = async (userId,bookId,bagId) => {  
    const data = await checkin({
      userId,
      bookId,
      bagId
    }); 
     if(data["status"] == "success"){   
      getUpdatedCheckBooks()
     } 
  }
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
  return (
    <React.Fragment>  
    <Title>Issued Books </Title>            
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
                    <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={(event ) => {handleMoreClick(event, row) }} > 
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
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={(event ) => {preventDefault(event); categorySwitch("books")}} >
          See All Book Details
        </Link>
      </div>
      <InfoDialog selectedValue={selectedInfoValue} open={infoDialogOpen} onClose={handleClose} />  
    </React.Fragment>
  );
}
DashTileIssued.propTypes = {
  categorySwitch: PropTypes.func.isRequired 
};