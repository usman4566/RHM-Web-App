import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 440,
  },
});

function ValueTablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://roadhealthmap.vercel.app/classified");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getClassColor = (classValue) => {
    if (classValue === 0) return "green";
    if (classValue === 1) return "red";
    if (classValue === 2) return "orange";
    return "";
  };

  const classes = useStyles();

  return (
    <div>
      <div
        style={{ display: "flex", paddingTop: "40px", marginLeft: "40px" }}
      ></div>

      <div style={{ margin: "40px" }}>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Longitude</TableCell>
                <TableCell>Latitude</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Condition</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item["Longitude"]}</TableCell>
                  <TableCell>{item["Latitude"]}</TableCell>
                  <TableCell>{item["Class"]}</TableCell>
                  <TableCell
                    style={{ backgroundColor: getClassColor(item["Class"]) }}
                  ></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

export default ValueTablePage;
