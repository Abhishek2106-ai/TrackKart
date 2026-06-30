import {
  Mail,
  ExternalLink,
  Code2,
  Link2,
} from "lucide-react";

import "../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}

        <div className="footer-brand">

          <h2>TrackKart</h2>

          <p>
            Intelligent e-commerce price monitoring platform
            that helps users track products, receive instant
            price alerts, and make smarter buying decisions.
          </p>

        </div>

        {/* Navigation */}

        <div className="footer-column">

          <h3>Navigation</h3>

          <a href="/">Home</a>

          <a href="#features">Features</a>

          <a href="/login">Login</a>

          <a href="/register">Register</a>

        </div>

        {/* Resources */}

        <div className="footer-column">

          <h3>Resources</h3>

          <a
            href="https://github.com/Abhishek2106-ai"
            target="_blank"
            rel="noreferrer"
          >
           <Code2 size={16} />
GitHub
          </a>

          <a
            href="https://github.com/Abhishek2106-ai/TrackKart"
            target="_blank"
            rel="noreferrer"
          >
            <ExternalLink size={16} />
            Project
          </a>

        </div>

        {/* Contact */}

        <div className="footer-column">

          <h3>Contact</h3>

          <a
            href="mailto:rajputabhishek2103@gmail.com"
          >
            <Mail size={16} />
            Email
          </a>

          <a
            href="https://www.linkedin.com/in/abhishek-singh-75a716311/"
            target="_blank"
            rel="noreferrer"
          >
          <Link2 size={16} />
LinkedIn
          </a>

        </div>

      </div>

      <div className="footer-bottom">

        <p>

          © 2026 TrackKart • Built by Abhishek Singh 

        </p>

      </div>

    </footer>
  );
}

export default Footer;