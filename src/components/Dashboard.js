import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge'; 
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { mainListItems, secondaryListItems } from './listItems'; 
import DashFrame from './DashFrame';
import BookFrame from './BookFrame';
import MemberFrame from './MemberFrame';
import ImportBookFrame from './ImportBookFrame';
import ReportFrame from './ReportFrame';
import GuestViewFrame from './GuestViewFrame';

function preventDefault(event) {
  event.preventDefault(); 
}
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#" preventDefault onClick={preventDefault}>
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
    background:"#eff3f2"
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard(props) {
  const { user_token } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [category, setcategory] = React.useState("dashboard");
  const handleDrawerOpen = () => { 
    if(user_token["user_details"]["role"]=="admin")
      setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleMenuClick = (event) => {  
    if(event.target.innerText)
      setcategory(event.target.innerText.toLowerCase()) 
    else if(event.target.getAttribute("name"))
      setcategory(event.target.getAttribute("name").toLowerCase())
    else if(event.target.tagName == "svg")
      setcategory(event.target.parentNode.getAttribute("name").toLowerCase()) 
    else if(event.target.tagName == "path")
      setcategory(event.target.parentNode.parentNode.getAttribute("name").toLowerCase())  
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const categorySwitch=(type)=>{setcategory(type)}
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
          <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Library
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        hidden={user_token["user_details"]["role"]!="admin"}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List onClick={handleMenuClick}>
          {mainListItems}
        </List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {(user_token["user_details"]["role"]!="admin")?<GuestViewFrame/>:category =="books"?<BookFrame/>:
         category =="members"?<MemberFrame/>:
          category =="reports"?<ReportFrame/>: 
           category =="importbooks"?<ImportBookFrame/>:
            <DashFrame categorySwitch = {categorySwitch}/>}
      </main>
    </div>
  );
}
Dashboard.propTypes = {
  user_token: PropTypes.object.isRequired
  }