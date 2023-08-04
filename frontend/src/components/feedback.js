import React, { useState, useEffect } from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 650,
  },
});

const FeedbackDisplay = () => {
  const classes = useStyles();
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    axios.get('https://roadhealthmap.vercel.app/feedbacks')
      .then(response => setFeedbacks(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table} aria-label="feedback display">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Feedback</TableCell>
            <TableCell align="right">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbacks.map((feedback) => (
            <TableRow key={feedback._id}>
              <TableCell component="th" scope="row">
                {feedback.name}
              </TableCell>
              <TableCell align="right">{feedback.email}</TableCell>
              <TableCell align="right">{feedback.feedback}</TableCell>
              <TableCell align="right">{feedback.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default FeedbackDisplay;
