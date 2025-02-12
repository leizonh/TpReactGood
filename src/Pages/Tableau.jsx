import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";  
import { UserContext } from "../Context/UserContext";

export default function Tableau() {
  const { user, logout } = useContext(UserContext);  
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");  
        if (!token) {
          throw new Error("Token manquant. Veuillez vous reconnecter.");
        }

        const response = await fetch("http://localhost:3000/dashboard", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`, 
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Erreur lors de la récupération des données.");
        }

        setUserData(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchData();
  }, []); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/connexion"); 
  };

  return (
    <div>
      <h1>Tableau de bord</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}  

      {userData ? (
        <div>
          <h2>Bienvenue, {userData.username || userData.email}</h2> 
          <p>Email: {userData.email}</p>
        </div>
      ) : (
        <p>Chargement de vos données...</p>
      )}

      <button onClick={handleLogout}>Se déconnecter</button>

    </div>
  );
}



/*
import {Link} from 'react-router';

export default function Tableau() {
  return (
    <div>
      <h1>Accueil</h1>
      <p>Bienvenue sur notre site</p>
      <Link to="/search">Rechercher un utilisateur GitHub</Link>
    </div>
  )
}
  */