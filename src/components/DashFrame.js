import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';  
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Grid,Typography,Container,Box} from '@material-ui/core'; 
import {Link} from '@material-ui/core';  
import DashTileBooks from './DashTileBooks';
import DashTileCustomers from './DashTileCustomers';
import DashTileIssued from './DashTileIssued'; 

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
    height: 350,
  },
}));

export default function DashFrame(props) {
  const { categorySwitch } = props;
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  return(
   <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <DashTileBooks categorySwitch ={categorySwitch}/>
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper} >
            <DashTileCustomers categorySwitch ={categorySwitch}/>
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <DashTileIssued  categorySwitch ={categorySwitch}/>
          </Paper>
        </Grid>
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
    </Container>
  )
}
DashFrame.propTypes = {
  categorySwitch: PropTypes.func.isRequired 
};