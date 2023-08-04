import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Splashscreen from "./components/splashscreen";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Analytics from "./pages/analytics";
import ProfilePage from "./pages/profile";
import Feedbackdisp from "./pages/feeds";
import TodoList from "./pages/taskmanager";
import SettingsPage from "./pages/setting";
import ResetPasswordPage from "./pages/resetpassword";



function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Splashscreen/>} exact />
          <Route path="/login" element={<Login/>} exact />
          <Route path="/dashboard" element={<Dashboard/>} exact/>
          <Route path="/analytic" element={<Analytics/>} exact/>
          <Route path="/profile" element={<ProfilePage/>} exact/>
          <Route path="/feedb" element={<Feedbackdisp/>} exact/>
          <Route path="/todo" element={<TodoList/>} exact/>
          <Route path="/home" element={<Dashboard/>} exact/>
          <Route path="/settings" element={<SettingsPage/>} exact/>
          <Route path="/reset/:token" element={<ResetPasswordPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
