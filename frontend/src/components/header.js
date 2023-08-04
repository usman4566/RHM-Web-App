import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import { faBars, faMap, faSignOut, faBell,faDashboard, faChartLine, faComment, faCog, faPerson} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 10,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const Header = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: false,
  });

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ isOpen: open });
  };
  const tonavigate = useNavigate();
  const analytic = () => {
    tonavigate('/analytic');
  };
  const profile = () => {
    tonavigate('/profile')
  }
  const feed = () =>{
    tonavigate('/feedb')
  }
  // const task = () =>{
  //   tonavigate('/todo')
  // }
  const home = () => {
    tonavigate('/home')
  }
  const setting = () => {
    tonavigate('/settings')
  }

  const sideList = () => (
    <div
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <h1 style={{backgroundColor:'lightgray', fontSize:'20px', textAlign:'center'}}>RHM
        <FontAwesomeIcon icon={faMap} />
      </h1>
      <List>
        <ListItemButton onClick={home}>
          <ListItemText>Home</ListItemText>
          <ListItemIcon>
            <FontAwesomeIcon icon={faDashboard} style={{paddingLeft:'15px'}}/>
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={analytic}>
          <ListItemText>Analytics</ListItemText>
          <ListItemIcon style={{paddingLeft:'15px'}}>
            <FontAwesomeIcon icon={faChartLine} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton onClick={profile}>
          <ListItemText>Profile</ListItemText>
          <ListItemIcon style={{paddingLeft:'15px'}}>
            <FontAwesomeIcon icon={faPerson} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemText onClick={feed}>Feedbacks</ListItemText>
          <ListItemIcon style={{paddingLeft:'15px'}}>
            <FontAwesomeIcon icon={faComment} />
          </ListItemIcon>
        </ListItemButton>
        <ListItemButton>
          <ListItemText onClick={setting}>Settings</ListItemText>
          <ListItemIcon style={{paddingLeft:'15px'}}>
            <FontAwesomeIcon icon={faCog} />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");

    tonavigate("/login");
  };

  return (
    <div className={classes.root}>
      <AppBar position="relative" style={{backgroundColor:'lightgray', borderRadius:'10px'}}>
        <Toolbar>
          <Button color="inherit" onClick={toggleDrawer(true)}>
          <FontAwesomeIcon icon={faBars} />
          </Button>
          <Typography variant="h6" className={classes.title}>
            Road <span style={{color:'black'}}>Health</span> Map
            <FontAwesomeIcon icon={faMap} style={{paddingLeft:'10px', color:'black'}}/>
          </Typography>
          <Button color="inherit" onClick={feed}>
          <FontAwesomeIcon icon={faBell} style={{paddingright:'12px', color:'black'}}/>
          </Button>
          <Button color="inherit" variant="contained" onClick={handleLogout}>Logout
          <FontAwesomeIcon icon={faSignOut} style={{paddingLeft:'5px', color:'black'}}/>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer open={state.isOpen} onClose={toggleDrawer(false)}>
        {sideList()}
      </Drawer>
    </div>
  );
};

export default Header;
