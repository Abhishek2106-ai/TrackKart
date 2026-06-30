import { useState } from "react";
import { register, verifyOtp, resendOtp } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Eye, EyeOff, TrendingUp, BellRing, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import "../styles/login.css";

export default function Register() {
  const location = useLocation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState(location.state?.step === "otp" ? "otp" : "form"); // "form" | "otp"

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [resending, setResending] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const data = await register({
        name,
        email,
        password,
      });

      if (data.requiresOtp) {
        toast.success("Verification code sent to your email");
        setStep("otp");
      } else {
        toast.error(
          data.message ||
            "Registration Failed"
        );
      }
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data?.message ||
          "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.trim().length !== 6) {
      toast.error("Enter the 6-digit code sent to your email");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOtp({ email, otp: otp.trim() });

      if (data.token) {
        login(data);
        toast.success("Email verified! Welcome to TrackKart.");
        navigate("/dashboard");
      } else {
        toast.error(data.message || "Verification failed");
      }
    } catch (err) {
      console.log(err);
      toast.error("Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResending(true);
    try {
      const data = await resendOtp(email);
      toast.success(data.message || "A new code has been sent");
    } catch (err) {
      console.log(err);
      toast.error("Couldn't resend code");
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-left">

        <h1>TrackKart</h1>

        <h2>
          Create Your Account
        </h2>

        <p>
          Track prices automatically,
          receive instant alerts and
          never miss the perfect deal.
        </p>

        <div className="feature-list">

          <div>
            <TrendingUp size={16} /> Live Price Tracking
          </div>

          <div>
            <BellRing size={16} /> Email Alerts
          </div>

          <div>
            <ShoppingCart size={16} /> Amazon & Flipkart
          </div>

        </div>

      </div>

      <div className="login-right">

        <div className="login-card">

          {step === "form" ? (
            <>
              <h2>Create Account</h2>

              <p>
                Join TrackKart today
              </p>

              <form onSubmit={handleSubmit}>

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                  required
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(
                      e.target.value
                    )
                  }
                  required
                />

                <div className="password-box">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Password"
                    value={password}
                    onChange={(e) =>
                      setPassword(
                        e.target.value
                      )
                    }
                    required
                  />

                  <button
                    type="button"
                    className="eye-btn"
                    onClick={() =>
                      setShowPassword(
                        !showPassword
                      )
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                </div>

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading
                    ? "Sending Code..."
                    : "Register"}
                </button>

              </form>

              <span>

                Already have an account?

                <Link to="/login">
                  Login
                </Link>

              </span>
            </>
          ) : (
            <>
              <h2>Verify Your Email</h2>

              <p>
                Enter the 6-digit code sent to <strong>{email}</strong>
              </p>

              <form onSubmit={handleVerify}>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="6-digit code"
                  value={otp}
                  onChange={(e) =>
                    setOtp(e.target.value.replace(/\D/g, ""))
                  }
                  required
                />

                <button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Continue"}
                </button>

              </form>

              <span>
                Didn't get the code?{" "}
                <button
                  type="button"
                  className="resend-link"
                  onClick={handleResend}
                  disabled={resending}
                >
                  {resending ? "Sending..." : "Resend Code"}
                </button>
              </span>
            </>
          )}

        </div>

      </div>

    </div>
  );
}