const cron = require("node-cron");

const updateAllPrices =
  require("../services/updatePrices");

function startPriceTracker() {

  console.log("Tracker Started");

  cron.schedule(
    "*/10 * * * *",
    async () => {

      console.log(
        "Running tracker..."
      );

      await updateAllPrices();

    }
  );

}

module.exports =
  startPriceTracker;