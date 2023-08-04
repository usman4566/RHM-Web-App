import React from "react";
import { useState,useEffect } from "react";
import {Navigate} from "react-router-dom";
import { faMap } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Splashscreen = () => {
    const [showLogin, setShowLogin] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowLogin(true);
        },5000);
    },[]);
        return showLogin ? <Navigate to="/login"/> : (
            <div style={styles.container}>
                <FontAwesomeIcon icon={faMap} style={styles.logo}/>
                <h1 styles={styles.title} style={{fontFamily:'sans-serif'}}>Road <span style={{color:'white'}}>Health</span> Map</h1>
            </div>
        );
};
const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: 'lightgrey',
    },
    logo: {
      width: 200,
      height: 200,
      animation: 'rotate 2s linear infinite',
    },
    title: {
      fontSize: 24,
      marginTop: 20,
    },
    '@keyframes rotate': {
      from: {
        transform: 'rotate(0deg)',
      },
      to: {
        transform: 'rotate(360deg)',
      },
    },
  };

export default Splashscreen;