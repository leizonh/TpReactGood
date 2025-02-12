import { useState } from 'react';
import './App.css';
import { UserProvider } from "./Context/UserContext"; 

// routes
import { BrowserRouter, Link, Route, Routes } from "react-router"; 
// protection routes 
// import ProtectedRoute from"./Composants/ProtectedRoute"; // ne fonctionne pas meme en l'ajoutant dans ma route ? 
//pages
import Connexion from "./Pages/Connexion";
import Inscription from "./Pages/Inscription";
import Tableau from "./Pages/Tableau";  

function App() {
  return (
    <UserProvider> 
      <BrowserRouter>
        <header >
          <Link to="/"  className="nav-link">Inscription</Link>
          <Link to="/connexion"  className="nav-link">Vous possédez un compte? cliquez ici</Link>
        </header>
        <Routes>
          <Route index element={<Inscription />} />
          <Route path="connexion" element={<Connexion />} />
          <Route path="dashboard" element={<Tableau />} /> 
        </Routes>
      </BrowserRouter>
    </UserProvider> 
  );
}

export default App;

