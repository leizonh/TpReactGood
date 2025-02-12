import React, { useContext } from "react";
import { Redirect } from "react-router";
import { UserContext } from "../Context/UserContext";


// ne fo,tionne pas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(UserContext);

  if (!isAuthenticated) {
    return <Redirect to="/connexion" />;
  }
  return children;
};

export default ProtectedRoute;
