import React from "react";
import Header from "../components/header.js";
import MapContainer from '../components/map.js';
import { Grid } from '@material-ui/core';

const Dashboard = () => {
  return (
    <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
      <Header />
      <Grid container spacing={3} style={{ margin: "10px auto", maxWidth: "1200px" }}>
        <Grid item xs={12} md={8}>
          <MapContainer apiKey="AIzaSyBXW3cDat5ckzuuglIlL7AYrIr0SXpis1Q" />
        </Grid>
      </Grid>
    </div>
  );
}

export default Dashboard;



