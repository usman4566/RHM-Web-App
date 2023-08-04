import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";

import Header from "../components/header";
import axios from "axios";

function SettingsPage() {
  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handlePasswordClickOpen = () => {
    setOpenPasswordModal(true);
  };

  const handlePasswordClose = () => {
    setOpenPasswordModal(false);
  };

  const handleProfileClickOpen = () => {
    setOpenProfileModal(true);
  };

  const handleProfileClose = () => {
    setOpenProfileModal(false);
  };

  //for updating profile
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  const [discrpvalue, setDiscrpValue] = useState("");

  const handleDiscrpChange = (event) => {
    setDiscrpValue(event.target.value);
  };
  const [file, setFile] = useState("");
  const handleSubmit = async (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    e.preventDefault();

    // const response = await axios.get(`http://localhost:5000/getAdminid`);
    // const admin = response.data.admin;

    // if (!admin) {
    //   alert("Admin not found");
    //   return;
    // }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", inputValue);
    formData.append("description", discrpvalue);
    formData.append("adminID", user._id);

    try {
      await axios.put(
        `https://roadhealthmap.vercel.app/updateAdminProfile/${user._id}`,
        formData
      );
      alert("Admin profile updated successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to update admin profile");
    }
  };

  const [newpass, setNewPass] = useState("");

  const handleNewPass = (event) => {
    setNewPass(event.target.value);
  };
  const [Cnfrmpass, setCnfrmPass] = useState("");

  const handleCnfrmPass = (event) => {
    setCnfrmPass(event.target.value);
  };
  const handlePassSubmit = async (event) => {
    event.preventDefault();
  
    const newPassword = newpass;
    const confirmNewPassword = Cnfrmpass;
  
    try {
      const token = localStorage.getItem("authtoken");
      console.log("Token:", token);
      const response = await fetch("https://roadhealthmap.vercel.app/ChangePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          newPassword,
          confirmNewPassword,
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        window.alert("Password changed successfully!");
      } else {
        console.log("Request failed with status:", response.status);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  

  return (
    <div>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "18%",
        }}
      >
        <Button
          variant="contained"
          color="inherit"
          onClick={handlePasswordClickOpen}
        >
          Change Password
        </Button>
        <Button
          variant="contained"
          color="inherit"
          onClick={handleProfileClickOpen}
          style={{ marginLeft: "40px" }}
        >
          Update Profile
        </Button>
      </div>
      <Dialog open={openPasswordModal} onClose={handlePasswordClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="new-password"
            label="New Password"
            type="password"
            value={newpass}
            onChange={handleNewPass}
            fullWidth
          />
          <TextField
            margin="dense"
            id="confirm-new-password"
            label="Confirm New Password"
            type="password"
            value={Cnfrmpass}
            onChange={handleCnfrmPass}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handlePasswordClose}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button
            onClick={handlePassSubmit}
            variant="contained"
            color="inherit"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openProfileModal} onClose={handleProfileClose}>
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <TextField
            type="file"
            id="image"
            label="profile pic"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
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
            color="inherit"
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
            color="inherit"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleProfileClose}
            variant="contained"
            color="inherit"
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="inherit">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default SettingsPage;
