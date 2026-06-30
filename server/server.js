const express = require("express");
const cors = require("cors");

const app = express();

const startPriceTracker =
  require("./jobs/priceTracker");

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://track-kart.vercel.app",
      "https://track-kart-git-main-abhishek2106-ais-projects.vercel.app",
      "https://track-kart-hvwac2t4z-abhishek2106-ais-projects.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/extract", require("./routes/extractRoutes"));
app.use("/api/history", require("./routes/historyRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

startPriceTracker();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});