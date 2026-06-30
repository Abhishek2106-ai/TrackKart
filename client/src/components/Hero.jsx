import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import DashboardPreview from "./DashboardPreview";
import "../styles/hero.css";
import "../styles/dashboardPreview.css";

function Hero() {
  return (
    <section className="hero">

      <div className="hero-left">

      <div className="hero-badge">
 <Sparkles size={14} /> Built for Smarter Online Shopping
</div>

<h1>
  Never Overpay
  <br />
  <span>For Online Shopping Again.</span>
</h1>

<p>
  Track Amazon and Flipkart products automatically,
  receive instant email alerts when prices drop,
  and monitor price history through a clean,
  intelligent dashboard.
</p>

<div className="hero-buttons">

  <Link
    to="/register"
    className="primary-btn"
  >
    Start Tracking Free
    <ArrowRight size={18} />
  </Link>

</div>

<div className="hero-trust">

  <span>No Credit Card</span>

  <span>•</span>

  <span>Free Forever</span>

  <span>•</span>

  <span>2 Stores Supported</span>

</div>

<div className="hero-metrics">

  <div>
    <h3>24/7</h3>
    <span>Background Tracking</span>
  </div>

  <div>
    <h3>2</h3>
    <span>Supported Stores</span>
  </div>

  <div>
    <h3>100%</h3>
    <span>Real-time Alerts</span>
  </div>

</div>

  
      </div>

      <div className="hero-right">

        <div className="hero-glow"></div>

        <DashboardPreview />

      </div>

    </section>
  );
}

export default Hero;