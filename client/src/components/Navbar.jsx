import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {ShoppingBag,ArrowRight,} from "lucide-react";
import "../styles/navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={`navbar ${
        scrolled ? "scrolled" : ""
      }`}
    >

      <Link to="/" className="logo">

        <ShoppingBag size={24} />

        <h2>TrackKart</h2>

      </Link>
<nav className="nav-links">

  <a href="#features">
    Features
  </a>

  <a href="#how-it-works">
    How It Works
  </a>

  <Link
    to="/login"
    className="login-btn"
  >
    Login
  </Link>

  <Link
    to="/register"
    className="cta-btn"
  >
    Get Started
    <ArrowRight size={16} />
  </Link>

</nav>

    </header>
  );
}

export default Navbar;