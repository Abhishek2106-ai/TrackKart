import {
  Package,
  Bell,
  Activity,
  ArrowDownRight,
  Sparkles,
} from "lucide-react";

function DashboardPreview() {
  return (
    <div className="dashboard-preview">

      <div className="preview-header">

        <div>

          <span className="preview-small">
            LIVE DASHBOARD
          </span>

          <h3>TrackKart Dashboard</h3>

        </div>

        <div className="live-badge">
  <Sparkles size={14} />
  Live
</div>

      </div>

      <div className="preview-stats">

        <div className="preview-card">

          <Package size={22} />

          <div>

            <h2>12</h2>

            <p>Tracked Products</p>

          </div>

        </div>

        <div className="preview-card">

          <Bell size={22} />

          <div>

            <h2>3</h2>

            <p>Active Alerts</p>

          </div>

        </div>

      </div>

      <div className="preview-section-title">

        Recently Tracked

      </div>

      <div className="preview-product">

        <div>

          <h4>Samsung Galaxy S25 Ultra</h4>

          <span>Flipkart • Live Tracking</span>

        </div>

       <div className="price-drop-icon">
  <ArrowDownRight size={18} />
</div>

      </div>

      <div className="preview-price">

        <span>Current Price</span>

        <strong>₹1,05,890</strong>

      </div>

      <div className="preview-target">

        <span>Target Price</span>

        <strong>₹99,999</strong>

      </div>

      <div className="progress-bar">

        <div className="progress-fill"></div>

      </div>

      <div className="preview-footer">

        <Activity
          size={18}
          color="#22C55E"
        />

        <span>

          Last synced just now

        </span>

      </div>

    </div>
  );
}

export default DashboardPreview;