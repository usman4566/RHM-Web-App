import React from "react";
import Header from "../components/header";
import LineChartsPage from "../components/charts";
import ValueTablePage from "../components/valuetable";

const Analytics = () => {
    return(
        <div>
            <Header/>
            <LineChartsPage/>
            <ValueTablePage/>
        </div>
    )
}
export default Analytics;