import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
  Legend
);

function PriceChart({ history = [] }) {
  const data = {
    labels: history.map((item) =>
      item.created_at
        ? new Date(
            item.created_at
          ).toLocaleTimeString()
        : "Unknown"
    ),

    datasets: [
      {
        label: "Price Trend",

        data: history.map((item) =>
          Number(item.price)
        ),

        borderWidth: 3,

        tension: 0.4,

        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        callbacks: {
          label: function (context) {
            return (
              "₹" +
              context.parsed.y.toLocaleString(
                "en-IN"
              )
            );
          },
        },
      },
    },

    scales: {
      y: {
        ticks: {
          callback: function (
            value
          ) {
            return (
              "₹" +
              Number(
                value
              ).toLocaleString(
                "en-IN"
              )
            );
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        width: "100%",
        height: "400px",
      }}
    >
      <Line
        data={data}
        options={options}
      />
    </div>
  );
}

export default PriceChart;