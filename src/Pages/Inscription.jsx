
import React, { useState } from "react";

export default function Inscription() {
  const [email, setEmail] = useState("");
  const [Mdp, setMdp] = useState("");
  const [valideMdp, setValideMdp] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMdpChange = (e) => setMdp(e.target.value);
  const handleValideMdpChange = (e) => setValideMdp(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (Mdp !== valideMdp) {
      setError("Les mots de passe ne correspondent pas !");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: Mdp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      setSuccess("Compte créé avec succès !");
      setEmail(""); 
      setMdp("");
      setValideMdp("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form">
    <form onSubmit={handleSubmit}>
      <h1>Créer un nouveau compte :</h1>
      <div>
        <label htmlFor="email">Votre email : </label>
        <input
          type="email" id="email" name="email" placeholder="mail" value={email} onChange={handleEmailChange} required
        />
      </div>
      <div>
        <label htmlFor="Mdp">Votre mot de passe : </label>
        <input
         type="password" id="Mdp" name="Mdp" placeholder="secret" value={Mdp} onChange={handleMdpChange} required
        />
      </div>
      <div>
        <label htmlFor="ValideMdp">Confirmer le mot de passe : </label>
        <input
          type="password" id="ValideMdp" name="ValideMdp" placeholder="secret" value={valideMdp} onChange={handleValideMdpChange} required
        />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <button type="submit" disabled={loading}>
        {loading ? "Inscription..." : "Confirmer l'inscription"}
      </button>
    </form>
    </div>
  );
}

