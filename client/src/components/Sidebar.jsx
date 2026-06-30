import { useNavigate } from "react-router-dom";
import {LayoutDashboard,Package,History,LogOut,Zap,ChevronRight,ShieldCheck,} from "lucide-react";
import { useAuth } from "../context/AuthContext";

function Sidebar({
  statsRef,
  productsRef,
  activityRef,
}) {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {

    logout();

    navigate("/login");

  };
const scrollToSection = (ref) => {
  if (ref?.current) {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};
  return (

    <aside className="sidebar">

      <div className="sidebar-logo">

  <div className="logo-icon">
    <Zap size={20} />
  </div>

  <div>

    <h2>TrackKart</h2>

    <p>PRICE INTELLIGENCE</p>

  </div>

</div>
      <nav className="sidebar-nav">

<button
  className="sidebar-link"
  onClick={() => scrollToSection(statsRef)}
  >
    <LayoutDashboard size={20} />
    Dashboard
  </button>

 <button className="sidebar-link"
    onClick={() =>
      scrollToSection(productsRef)
    }
  >
    <Package size={20} />
    Products
  </button>

  <button className="sidebar-link"
    onClick={() =>
      scrollToSection(activityRef)
    }
  >
    <History size={20} />
    Activity
  </button>

  {user?.is_admin && (
    <button
      className="sidebar-link"
      onClick={() => navigate("/admin")}
    >
      <ShieldCheck size={20} />
      Admin
    </button>
  )}

</nav>

      <div className="sidebar-footer">

        <div className="user-avatar">

          {user?.name?.charAt(0).toUpperCase() || "U"}

        </div>
<div className="user-info">

  <h4>

    {user?.name || "User"}

  </h4>

  <p>

    {user?.email}

  </p>

</div>

<ChevronRight
  size={18}
  className="profile-arrow"
/>

      </div>

      <button
  className="logout-btn glass"
  onClick={handleLogout}
>
        <LogOut size={18}/>

        Logout

      </button>

    </aside>

  );

}

export default Sidebar;