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
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import DashTileBooks from './DashTileBooks';
import DashTileCustomers from './DashTileCustomers';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
      height: 400,
    },
    searchFixedHeight: {
        height: 200,
    }, 
  }));

export default function ReportFrame() {
  const classes = useStyles();
  const [reportIndex, setReportIndex] = React.useState('');
  const [reportType, setReportType] = React.useState([]); 
  const searchFixedHeight = clsx(classes.paper, classes.searchFixedHeight); 
  const fixedHeight = clsx(classes.paper, classes.fixedHeight); 
  const handleChange = (event) => {
    setReportIndex(event.target.value); 
    setReportType(event.target.value)    
  };
 

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) { 
      return (
        <div className="custom-tooltip" style={{ background:"rgba(238, 245, 246, 0.79)",padding:"10"}}> 
          <p className="label">{`${label} `}</p>
          <p className="label">{`Issued: ${payload[0].payload.issued} `}</p>
          <p className="label">{`Available: ${payload[0].payload.inventory_count- payload[0].payload.checkout_count  }`}</p>
          <p className="label">{`TotalCount: ${payload[0].payload.inventory_count}`}</p> 
        </div>
      );
    }  
    return null;
  };
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
                        label="Age"
                      >
                        <MenuItem value=""> <em>None</em> </MenuItem>
                        <MenuItem value={"book"}>Most Popular Books</MenuItem>
                        <MenuItem value={"member"}>Member Spending Trends</MenuItem> 
                      </Select>
                    </FormControl>
                    <Button variant="contained" 
                      color="primary"
                        style={{width:"20%",marginTop:"20px"}} >
                      Fetch Report  
                    </Button>

                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={12}>            
                <Paper className={fixedHeight}>                   
                  <Grid item xs={12} md={4} lg={6}>    
                     {reportType=="book"?<DashTileBooks hideLink={true}/>:
                     reportType=="member"?<DashTileCustomers hideLink={true}/>:<p></p>}
                  </Grid> 
                </Paper>
             </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
     </Container>
  )
}