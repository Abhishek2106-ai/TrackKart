import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { Sparkles, BellRing, TrendingDown, Package } from "lucide-react";

function PackageIcon() {
  return (
    <div className="hero-icon-box">
      <Package size={22} />
    </div>
  );
}

function Topbar() {
  const { logout, user } = useAuth();
  const { products } = useProducts();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const alerts =
    products.filter(
      (p) =>
        Number(p.current_price) <=
        Number(p.target_price)
    ).length;

  const savings = products.reduce(
  (sum, p) => {
    const diff =
      Number(p.target_price) -
      Number(p.current_price);

    return sum + (diff > 0 ? diff : 0);
  },
  0
);

  return (

    <div className="hero-banner">

     <div className="hero-content">

  <span className="topbar-badge">

    <Sparkles size={14} />

    Dashboard Overview

  </span>

  <h1>

    Welcome back,

    <span> {user?.name}</span>

  </h1>

  <p>

    Monitor every tracked product, receive instant alerts and discover better deals—all from one premium dashboard.

  </p>

</div>

      <div className="hero-stats">

        <div className="hero-stat-card">

  <PackageIcon />

  <div>

    <h3>{products.length}</h3>

    <span>Tracked Products</span>

  </div>

</div>
<div className="hero-stat-card">

  <BellRing size={22} />

  <div>

    <h3>{alerts}</h3>

    <span>Active Alerts</span>

  </div>

</div>

      <div className="hero-stat-card">

  <TrendingDown size={22} />

  <div>

    <h3>

      ₹{savings.toLocaleString("en-IN")}

    </h3>

    <span>Total Savings</span>

  </div>

</div>

      </div>

    
    </div>

  );
}

export default Topbar;