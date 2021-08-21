import React from 'react';
import clsx from 'clsx'; 
import Title from './Title';
import { makeStyles } from '@material-ui/core/styles';  
import {Paper,Grid,Typography,Container,Box} from '@material-ui/core';
import {Table ,TableBody ,TableCell,TableContainer,TableHead,TableRow} from '@material-ui/core';   
import {Select,FormControl,InputLabel,Button,MenuItem,Link} from '@material-ui/core';  
import DashTileBooks from './DashTileBooks';
import DashTileCustomers from './DashTileCustomers';   

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
    height: 400,
  },
  searchFixedHeight: {
      height: 200,
  }, 
}));

export default function ReportFrame() {
  const classes = useStyles();
  const [reportIndex, setReportIndex] = React.useState('');
  const [reportType, setReportType] = React.useState(''); 
  const [custReportData, setCustReportData] = React.useState([]); 
  const [bookReportData, setBookReportData] = React.useState([]);  
  const searchFixedHeight = clsx(classes.paper, classes.searchFixedHeight); 
  const fixedHeight = clsx(classes.paper, classes.fixedHeight); 
 
  const handleChange = (event) => {
    setReportIndex(event.target.value); 
    setReportType(event.target.value)    
  };
 
  const custDataReady=(data)=>{  
    setCustReportData(data["rank_list"])
  };
  const bookDataReady=(data)=>{  
    setBookReportData(data["rank_list"])
  };
  const handleDownload=()=>{ 
    let csvContent = "data:text/csv;charset=utf-8,"  
    if(reportType=="member"){
    csvContent +="Amount Spend,First Name,Last name,Type\n" 
    custReportData.map(row => {
      csvContent += row.item_count +","
      csvContent += row.member_item.first_name +","
      csvContent += row.member_item.last_name +","
      csvContent += row.member_item.role +"\n"
    })
  }else {
    csvContent +="Title,Author,Publish,Issue Count,Available,Total\n";
    bookReportData.map(row => {
      csvContent +=row.book_item.title+","
      csvContent += row.book_item.authors+","
      csvContent += row.book_item.publisher+","
      csvContent += row.item_count+"," 
      csvContent += row.inventory_count-row.checkout_count+"," 
      csvContent += row.inventory_count+"\n"
    })
  }
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", reportType=="member"?"HighestPayingCustomers.csv":"TopIssuedBooks.csv");
    document.body.appendChild(link);  
    link.click()
} 
return(
  <Container maxWidth="lg" className={classes.container}>
    <Grid container spacing={3}>             
      <Grid item xs={12} md={4} lg={12}>            
        <Paper className={searchFixedHeight}>            
          <Title>Select Report to view </Title>            
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="demo-simple-select-outlined-label">Report</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={reportIndex}
              onChange={handleChange}
              label="Age">
              <MenuItem value=""> <em>None</em> </MenuItem>
              <MenuItem value={"book"}>Top Issued Books </MenuItem>
              <MenuItem value={"member"}>Highest Paying Customers</MenuItem> 
            </Select>
          </FormControl>
          <Button variant="contained" color="primary" style={{width:"20%",marginTop:"20px"}} disabled={reportType==""} onClick={handleDownload}>
            Download Report  
          </Button>
        </Paper>
      </Grid>
      {reportIndex!=""?
      <Grid item xs={12} md={4} lg={4}>            
        <Paper className={fixedHeight}>   
          {reportType=="book"?<DashTileBooks hideLink={true} bookDataReady={bookDataReady}/>:
          reportType=="member"?<DashTileCustomers hideLink={true} custDataReady={custDataReady}/>:<p></p>} 
        </Paper>
      </Grid>:<div></div>}
      {reportIndex!=""?
      <Grid item xs={12} md={4} lg={8}>            
        <Paper className={fixedHeight}>   
          <TableContainer className={classes.tablecontainer} >
            <Table  stickyHeader aria-label="sticky table">
            <TableHead>
                {reportType=="member"?<TableRow> 
                  <TableCell> Amount Spend </TableCell>
                  <TableCell> First Name </TableCell>
                  <TableCell> last name </TableCell> 
                  <TableCell> Type </TableCell>  
                </TableRow>
                :reportType=="book"?<TableRow> 
                  <TableCell>Title</TableCell>
                  <TableCell> Author </TableCell>
                  <TableCell> Publish </TableCell> 
                  <TableCell> Issue Count </TableCell> 
                  <TableCell> Available </TableCell>  
                  <TableCell> Total </TableCell>  
              </TableRow>:<div></div>}
            </TableHead>
            <TableBody>
            {reportType=="member"?custReportData.slice(0).reverse().map((row) => (                            
                <TableRow key={row.member_item.id}>
                  <TableCell>{row.item_count}</TableCell> 
                  <TableCell>{row.member_item.first_name}</TableCell>
                  <TableCell>{row.member_item.last_name}</TableCell> 
                  <TableCell>{row.member_item.role}</TableCell>  
                </TableRow>
                )):reportType=="book"?bookReportData.slice(0).reverse().map((row) => (                            
              <TableRow key={row.book_item.bookID}>
                <TableCell>{row.book_item.title}</TableCell> 
                <TableCell>{row.book_item.authors}</TableCell>
                <TableCell>{row.book_item.publisher}</TableCell> 
                <TableCell>{row.item_count}</TableCell>  
                <TableCell>{row.inventory_count- row.checkout_count}</TableCell>                                
                <TableCell>{row.inventory_count}</TableCell>  
              </TableRow>
              )):<div></div>}
                </TableBody> 
            </Table> 
            </TableContainer> 
          </Paper>
        </Grid>:<div></div>}
    </Grid>
    <Box pt={4}>
      <Copyright />
    </Box>
  </Container>
  )
}