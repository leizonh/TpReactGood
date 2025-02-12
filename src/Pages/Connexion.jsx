import '/src/App.css';
import React, { useState, useContext } from "react";
import { UserContext } from "../Context/UserContext";
import { useNavigate } from "react-router";

export default function Login() {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", { //api 
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Identifiants incorrects");
      }
      login(data.user, data.token);
      
      // go to le tableau
      navigate("/dashboard");  
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div  className="form">
      <form onSubmit={handleSubmit}>
        <h1>Connectez-vous :</h1>
        <p>
          <label htmlFor="email">Votre email : </label>
          <input
            type="email" id="email" name="email" placeholder="mail" value={email} onChange={(e) => setEmail(e.target.value)} required
          />
        </p>
        <p>
          <label htmlFor="password">Votre mot de passe : </label>
          <input
            type="password" id="password" name="password" placeholder="secret" value={password} onChange={(e) => setPassword(e.target.value)} required
          />
        </p>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Valider"}
        </button>
      </form>
    </div>
  );
}


