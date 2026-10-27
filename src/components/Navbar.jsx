import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useAuth } from "../context/AuthContext";
function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }
  return (
    <nav className="navbar">
      <h1>DEV@Deakin</h1>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <a href="#questions">Questions</a>
        <Link to="/Article">Article</Link>
        <a href="#tutorials">Tutorials</a>
        <Link to="/pricing">Pricing</Link>
      </div>
      <div className="nav-right">
        <input type="text" placeholder="Search..." />
        {!loading && (
          user ? (
            <>
              <span>
                Hi, {user.displayName || user.email}
              </span>
              <button onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;