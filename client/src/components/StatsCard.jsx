import { TrendingUp } from "lucide-react";

function StatsCard({
  icon,
  title,
  value,
}) {
  return (
    <div className="stats-card">

      <div className="stats-card-top">

        <div className="stats-icon">

          {icon}

        </div>

        <div className="stats-trend">

          <TrendingUp size={14} />

          <span>Live</span>

        </div>

      </div>

      <div className="stats-content">

        <p>

          {title}

        </p>

        <h2>

          {value}

        </h2>

      </div>

      <div className="stats-progress">

        <div className="stats-progress-fill"></div>

      </div>

    </div>
  );
}

export default StatsCard;