import React, { useState,useEffect, useLayoutEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Header from "../components/header";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from 'axios';
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3, 2),
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    margin: "auto",
  },
}));

function ProfilePage() {

const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [admin,setAdmin]=useState({})
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [discrpvalue,setDiscrpValue] = useState('');

  const handleDiscrpChange = (event) => {
    setDiscrpValue(event.target.value);
  };
  const [file,setFile]=useState('')
  const classes = useStyles();
  const handleSubmit = async()=>{
      const user=JSON.parse(localStorage.getItem('user'))

      const formData=new FormData();
      formData.append("name",inputValue);
      formData.append("description",discrpvalue);
      formData.append("image",file);
      formData.append("email",user.email);
      formData.append("adminid",user._id)
      console.log(user.email)

      fetch('https://roadhealthmap.vercel.app/adminProfile',{
        method: 'POST',
        body: formData
      }).then(res=>res.json())
      .then(data=>{
        console.log(data)
        localStorage.setItem('adminProfile',JSON.stringify(data))
        handleClose();
      })

      
    }
  const showInfo = async() =>{
    const user=JSON.parse(localStorage.getItem('user'))
    console.log(user.email)
    let email=user.email;
      await Axios.post('https://roadhealthmap.vercel.app/getAdminProfile', {
        email
      })
      .then((response) => {
        console.log(response.data.savedAdmin);
        setAdmin(response.data.savedAdmin);

      })
      .catch((error) => {
        if(error.response) {
          console.log(error.response.data);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
          
        }
        console.log(error.config);
      });
  }
  useEffect (()=>{
    showInfo();
  },[])
  return (
    <div>
      <Header />
      <Grid container style={{marginTop:'50px'}}>
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar
                  alt="Profile Picture"
                  src={admin.profilepic}
                  className={classes.avatar}
                />
              }
              title={admin.name}
              subheader={admin.email}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p" style={{fontWeight:'bold'}}>
                {admin.description}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Button variant="contained" color="success" onClick={handleClickOpen} style={{marginLeft:'40px',marginTop:'20px'}}>
        Create Profile
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter Details</DialogTitle>
        <DialogContent>
          <TextField
          type="file"
          id="image"
          label="profile pic"
          onChange={(e)=>{setFile(e.target.files[0])}}
          fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter you Full name"
            type="text"
            fullWidth
            value={inputValue}
            onChange={handleInputChange}
            color='inherit'
          />
          <TextField
            id="filled-multiline-static"
            label="Description"
            multiline
            rows={4}
            autoFocus
            margin="dense"
            type="text"
            fullWidth
            value={discrpvalue}
            onChange={handleDiscrpChange}
            color='inherit'
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="inherit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ProfilePage;
