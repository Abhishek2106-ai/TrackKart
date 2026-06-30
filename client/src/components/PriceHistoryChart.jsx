import { useMemo, useRef, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler
);

const ACCENT = "#7C3AED";
const ACCENT_SOFT = "rgba(124, 58, 237, 0.18)";

function PriceHistoryChart({ history }) {
  const canvasWrapRef = useRef(null);
  const [gradient, setGradient] = useState(null);

  const sorted = useMemo(() => {
    return history
      .slice()
      .sort(
        (a, b) =>
          new Date(a.created_at) - new Date(b.created_at)
      );
  }, [history]);

  const prices = sorted.map((item) => Number(item.price));
  const lowest = prices.length ? Math.min(...prices) : 0;

  useEffect(() => {
    const canvas = canvasWrapRef.current?.querySelector("canvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const g = ctx.createLinearGradient(0, 0, 0, 320);
    g.addColorStop(0, "rgba(124, 58, 237, 0.32)");
    g.addColorStop(1, "rgba(124, 58, 237, 0)");
    setGradient(g);
  }, [sorted.length]);

  const showPoints = sorted.length <= 40;

  const data = {
    labels: sorted.map((item) =>
      item.created_at
        ? new Date(item.created_at).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
          })
        : "Unknown"
    ),

    datasets: [
      {
        label: "Price",
        data: prices,
        borderColor: ACCENT,
        backgroundColor: gradient || ACCENT_SOFT,
        borderWidth: 2.5,
        tension: 0.35,
        fill: true,
        pointRadius: showPoints ? 3 : 0,
        pointHoverRadius: 5,
        pointBackgroundColor: "#0F172A",
        pointBorderColor: ACCENT,
        pointBorderWidth: 2,
        pointHitRadius: 12,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: "index",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(15, 23, 42, 0.95)",
        borderColor: "rgba(124, 58, 237, 0.35)",
        borderWidth: 1,
        padding: 12,
        titleColor: "#94A3B8",
        bodyColor: "#F8FAFC",
        titleFont: { size: 11, weight: "600" },
        bodyFont: { size: 14, weight: "700" },
        displayColors: false,
        callbacks: {
          label: function (context) {
            return "₹" + context.parsed.y.toLocaleString("en-IN");
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#64748B",
          font: { size: 11 },
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 8,
        },
        border: {
          color: "rgba(255,255,255,.08)",
        },
      },
      y: {
        grid: {
          color: "rgba(255,255,255,.06)",
        },
        border: {
          display: false,
        },
        ticks: {
          color: "#64748B",
          font: { size: 11 },
          maxTicksLimit: 6,
          callback: function (value) {
            return "₹" + Number(value).toLocaleString("en-IN");
          },
        },
      },
    },
  };

  if (!sorted.length) {
    return (
      <div className="chart-empty-state">
        No price data yet — sync this product to start building its trend.
      </div>
    );
  }

  return (
    <div className="price-chart-wrap" ref={canvasWrapRef}>
      <div className="price-chart-legend">
        <span>
          <i className="dot accent" />
          Price trend
        </span>
        <span className="price-chart-low">
          Lowest: ₹{lowest.toLocaleString("en-IN")}
        </span>
      </div>
      <div className="price-chart-canvas">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}

export default PriceHistoryChart;
