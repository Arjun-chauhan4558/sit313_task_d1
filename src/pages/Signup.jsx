
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase";
import "./Login.css";

function Signup() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: fullName });
    await setDoc(doc(db, "users", userCredential.user.uid), {
      fullName: fullName,
      email: email,
      createdAt: serverTimestamp(),
      plan: "Free"
    });
      await auth.signOut();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };
  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <label htmlFor="fullName">Full Name</label>
        <input type="text" id="fullName" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        <label htmlFor="signupEmail">Email</label>
        <input type="email" id="signupEmail" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <label htmlFor="signupPassword">Password</label>
        <input type="password" id="signupPassword" placeholder="Create a password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <label htmlFor="confirmPassword">Confirm Password</label>
         
      <input type="password" id="confirmPassword" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        {error && <p>{error}</p>}
        <button type="submit">Sign Up</button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
      </form>
    </div>
  );
}

export default Signup;
