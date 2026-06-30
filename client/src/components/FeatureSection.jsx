import "../styles/features.css";
import {
  Activity,
  BellRing,
  ChartSpline,
  LayoutDashboard,
  ShieldCheck,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: <Activity size={34} />,
    title: "Smart Price Tracking",
    description:
      "Automatically monitor product prices every few minutes without manually checking shopping websites.",
  },
  {
    icon: <BellRing size={34} />,
    title: "Instant Email Alerts",
    description:
      "Receive an email immediately when a product reaches or drops below your target price.",
  },
  {
    icon: <ChartSpline size={34} />,
    title: "Price Analytics",
    description:
      "Understand market trends with interactive price history and historical tracking.",
  },
  {
    icon: <LayoutDashboard size={34} />,
    title: "Modern Dashboard",
    description:
      "Manage every tracked product from one clean dashboard designed for speed and simplicity.",
  },
  {
    icon: <ShieldCheck size={34} />,
    title: "Secure Authentication",
    description:
      "JWT authentication with encrypted passwords ensures every account stays protected.",
  },
  {
    icon: <Clock3 size={34} />,
    title: "24×7 Background Monitoring",
    description:
      "Background jobs continuously monitor product prices so you never miss the perfect deal.",
  },
];

function FeatureSection() {
  return (
    <section
      className="premium-features"
      id="features"
    >
      <div className="features-title">

        <span>WHY TRACKKART</span>

        <h2>
          Everything you need to
          <br />
          shop smarter.
        </h2>

        <p>
          A modern platform built for automatic
          product tracking, intelligent price
          monitoring and instant notifications.
        </p>

      </div>

      <div className="premium-grid">

        {features.map((feature) => (

          <div
  className="premium-card glass-card"
  key={feature.title}
>

            <div className="feature-icon gradient-icon">

              {feature.icon}

            </div>

            <h3>

              {feature.title}

            </h3>

            <p>

              {feature.description}

            </p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default FeatureSection;