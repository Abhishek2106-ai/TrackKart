import { useState } from "react";
import { login as loginApi } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, TrendingUp, BellRing, Zap } from "lucide-react";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");


  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const data = await loginApi({
      email,
      password,
    });

    if (data.token) {
      login(data);
      navigate("/dashboard");
    } else if (data.requiresOtp) {
      navigate("/register", {
        state: { email: data.email, step: "otp" },
      });
    } else {
      setError(data.message || "Invalid credentials");
    }
  } catch {
    setError("Something went wrong.");
  }

  finally {
  setLoading(false);
}
};
  return (
    <div className="login-page">

      <div className="login-left">

        <h1>TrackKart</h1>

        <h2>Track Prices Smarter.</h2>

        <p>
          Never miss the perfect deal again.
          Monitor products automatically and receive instant alerts.
        </p>

        <div className="feature-list">

          <div><TrendingUp size={16} /> Live Price History</div>

          <div><BellRing size={16} /> Instant Notifications</div>

          <div><Zap size={16} /> Automatic Price Tracking</div>

        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          <h2>Welcome Back</h2>

          <p>Sign in to your account</p>

          <form onSubmit={handleSubmit}>

  <input
    type="email"
    placeholder="Email Address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

 <div className="password-box">

  <input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

  <button
    type="button"
    className="eye-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}
  </button>

</div>
  {error && <div className="error-box">{error}</div>}

  <button type="submit" disabled={loading}>
{loading ? "Loading..." : "Login"}
  </button>

</form>

          <span>

            Don't have an account?

            <Link to="/register">

              Register

            </Link>

          </span>

        </div>

      </div>

    </div>
  );
}