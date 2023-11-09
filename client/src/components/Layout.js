import React from "react";
import { Outlet } from "react-router-dom";
import Nav from "./Nav-component";
import Footer from "./Footer-component";

const Layout = ({ currentUser, setCurrentUser }) => {
  return (
    <>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
