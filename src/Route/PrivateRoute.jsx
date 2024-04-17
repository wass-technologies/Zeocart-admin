import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const [login, setLogin] = useState(JSON.parse(localStorage.getItem("login")));
  const [authenticated, setAuthenticated] = useState(localStorage.getItem('accessToken')?true:false);

  useEffect(() => {
    setAuthenticated(localStorage.getItem('accessToken')?true:false);
    setLogin(localStorage.getItem('accessToken')?true:false);
    localStorage.setItem("authenticated", authenticated);
    localStorage.setItem("login", login);
  }, []);
  return login && authenticated ? <Outlet /> : <Navigate exact to={`${process.env.PUBLIC_URL}/login`} />;
};

export default PrivateRoute;
