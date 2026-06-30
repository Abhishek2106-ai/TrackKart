import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Package,
  BellRing,
  Wallet,
  ShieldCheck,
  Trash2,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  ArrowLeft,
} from "lucide-react";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import {
  getAdminStats,
  getAllUsers,
  getAllProducts,
  setUserAdminRole,
  deleteUserApi,
  deleteAnyProductApi,
} from "../services/adminService";

import "../styles/admin.css";

function Admin() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [tab, setTab] = useState("users");
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadAll() {
      try {
        setLoading(true);
        const [statsData, usersData, productsData] = await Promise.all([
          getAdminStats(),
          getAllUsers(),
          getAllProducts(),
        ]);
        setStats(statsData);
        setUsers(usersData);
        setProducts(productsData);
      } catch (err) {
        toast.error(err.message || "Couldn't load admin data");
      } finally {
        setLoading(false);
      }
    }

    loadAll();
  }, []);
  const handleToggleAdmin = async (target) => {
    try {
      const updated = await setUserAdminRole(target.id, !target.is_admin);
      setUsers((prev) =>
        prev.map((u) => (u.id === target.id ? { ...u, ...updated } : u))
      );
      toast.success(
        updated.is_admin
          ? `${target.name} is now an admin`
          : `${target.name} is no longer an admin`
      );
    } catch (err) {
      toast.error(err.message || "Couldn't update role");
    }
  };

  const handleDeleteUser = async (target) => {
    if (target.id === user.id) {
      toast.error("You can't delete your own account here.");
      return;
    }
    if (!window.confirm(`Delete user "${target.name}" and all their tracked products?`)) return;
    try {
      await deleteUserApi(target.id);
      setUsers((prev) => prev.filter((u) => u.id !== target.id));
      setProducts((prev) => prev.filter((p) => p.user_id !== target.id));
      toast.success("User deleted");
    } catch (err) {
      toast.error(err.message || "Couldn't delete user");
    }
  };

  const handleDeleteProduct = async (product) => {
    if (!window.confirm(`Delete "${product.title}" from tracking?`)) return;
    try {
      await deleteAnyProductApi(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
      toast.success("Product deleted");
    } catch (err) {
      toast.error(err.message || "Couldn't delete product");
    }
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredProducts = products.filter(
    (p) =>
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.owner?.email?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-topbar">
        <div className="admin-topbar-left">
          <button className="admin-back-btn" onClick={() => navigate("/dashboard")}>
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>
          <div className="admin-title">
            <ShieldCheck size={22} />
            <div>
              <h1>Admin Console</h1>
              <p>System-wide users, products and analytics.</p>
            </div>
          </div>
        </div>

        <button
          className="admin-logout-btn"
          onClick={() => {
            logout();
            navigate("/login");
          }}
        >
          Logout
        </button>
      </div>

      <section className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon users">
            <Users size={22} />
          </div>
          <div>
            <span>Total Users</span>
            <h2>{stats?.totalUsers ?? 0}</h2>
            <small>{stats?.newUsersThisWeek ?? 0} new this week</small>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon products">
            <Package size={22} />
          </div>
          <div>
            <span>Tracked Products</span>
            <h2>{stats?.totalProducts ?? 0}</h2>
            <small>{stats?.priceHistoryRecords ?? 0} price records logged</small>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon alerts">
            <BellRing size={22} />
          </div>
          <div>
            <span>Active Alerts</span>
            <h2>{stats?.activeAlerts ?? 0}</h2>
            <small>Targets currently reached</small>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon savings">
            <Wallet size={22} />
          </div>
          <div>
            <span>Potential Savings</span>
            <h2>₹{(stats?.totalSavings ?? 0).toLocaleString("en-IN")}</h2>
            <small>{stats?.adminUsers ?? 0} admin account(s)</small>
          </div>
        </div>
      </section>

      <section className="admin-panel">
        <div className="admin-panel-header">
          <div className="admin-tabs">
            <button
              className={tab === "users" ? "active" : ""}
              onClick={() => setTab("users")}
            >
              Users ({users.length})
            </button>
            <button
              className={tab === "products" ? "active" : ""}
              onClick={() => setTab("products")}
            >
              Products ({products.length})
            </button>
          </div>

          <div className="admin-search">
            <Search size={16} />
            <input
              placeholder={tab === "users" ? "Search users..." : "Search products..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {tab === "users" ? (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Role</th>
                  <th>Joined</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td className="muted">{u.email}</td>
                    <td>
                      <span className={`pill ${u.is_verified ? "good" : "warn"}`}>
                        {u.is_verified ? "Verified" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <span className={`pill ${u.is_admin ? "admin" : ""}`}>
                        {u.is_admin ? "Admin" : "User"}
                      </span>
                    </td>
                    <td className="muted">
                      {u.created_at
                        ? new Date(u.created_at).toLocaleDateString("en-IN")
                        : "—"}
                    </td>
                    <td>
                      <div className="admin-row-actions">
                        <button
                          className="admin-icon-btn"
                          title={u.is_admin ? "Revoke admin" : "Make admin"}
                          onClick={() => handleToggleAdmin(u)}
                        >
                          {u.is_admin ? (
                            <ArrowDownRight size={15} />
                          ) : (
                            <ArrowUpRight size={15} />
                          )}
                        </button>
                        <button
                          className="admin-icon-btn danger"
                          title="Delete user"
                          onClick={() => handleDeleteUser(u)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={6} className="admin-empty">
                      No users match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Owner</th>
                  <th>Current</th>
                  <th>Target</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((p) => {
                  const reached =
                    Number(p.current_price) <= Number(p.target_price);
                  return (
                    <tr key={p.id}>
                      <td className="admin-product-cell">{p.title}</td>
                      <td className="muted">
                        {p.owner?.email || "Unknown"}
                      </td>
                      <td>₹{Number(p.current_price).toLocaleString("en-IN")}</td>
                      <td>₹{Number(p.target_price).toLocaleString("en-IN")}</td>
                      <td>
                        <span className={`pill ${reached ? "good" : ""}`}>
                          {reached ? "Target Reached" : "Watching"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="admin-icon-btn danger"
                          title="Delete product"
                          onClick={() => handleDeleteProduct(p)}
                        >
                          <Trash2 size={15} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {filteredProducts.length === 0 && (
                  <tr>
                    <td colSpan={6} className="admin-empty">
                      No products match your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Admin;
