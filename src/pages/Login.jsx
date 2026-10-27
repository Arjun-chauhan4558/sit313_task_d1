
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password.");
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <label htmlFor="loginEmail">Email</label>
        <input type="email" id="loginEmail" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="loginPassword">Password</label>
        <input type="password" id="loginPassword" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        {error && <p>{error}</p>}
        <button type="submit">Log In</button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
      </form>
    </div>
  );
}

export default Login;
