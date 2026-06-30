const supabase = require("../config/supabase");
const scrapeProduct = require("../scraper");
const sendEmail = require("../utils/sendEmail");

async function updateAllPrices() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*");

  if (error) {
    console.error("Database Error:", error.message);
    return;
  }

  for (const product of products) {
    try {
      const scraped = await scrapeProduct(product.product_url);

      if (!scraped || !scraped.price) {
        console.log(`Skipping ${product.title}`);
        continue;
      }

      const latestPrice = Number(
        String(scraped.price).replace(/[^\d.]/g, "")
      );

      if (isNaN(latestPrice)) {
        console.log(`Invalid price for ${product.title}`);
        continue;
      }

      // Update only if price changed
      if (latestPrice !== Number(product.current_price)) {
        await supabase
          .from("products")
          .update({
            current_price: latestPrice,
          })
          .eq("id", product.id);

        // Insert history only if different from last price
        const { data: lastHistory } = await supabase
          .from("price_history")
          .select("price")
          .eq("product_id", product.id)
          .order("created_at", {
            ascending: false,
          })
          .limit(1);

        if (
          !lastHistory.length ||
          Number(lastHistory[0].price) !== latestPrice
        ) {
          await supabase
            .from("price_history")
            .insert([
              {
                product_id: product.id,
                price: latestPrice,
              },
            ]);
        }

        console.log(
          `✓ ${product.title}
₹${product.current_price} → ₹${latestPrice}`
        );
      }

      // Send alert
if (
  latestPrice <= Number(product.target_price) &&
  !product.alert_sent
) {

  const { data: owner, error: ownerError } =
    await supabase
      .from("users")
      .select("name,email")
      .eq("id", product.user_id)
      .single();

  if (ownerError || !owner) {
    console.log("Owner not found");
    continue;
  }

  await sendEmail(
    owner.email,
    "🚨 TrackKart Price Alert",
    `
Hi ${owner.name},

Great news! 🎉

The product you've been tracking has reached your target price.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Product
${product.title}

💰 Current Price
₹${latestPrice.toLocaleString("en-IN")}

🎯 Your Target Price
₹${Number(product.target_price).toLocaleString("en-IN")}

🛒 Buy Now
${product.product_url}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

This alert was sent because the current price is now at or below your target price.

Happy Shopping!

—
TrackKart
Your Personal Price Tracker
`
  );

  await supabase
    .from("products")
    .update({
      alert_sent: true,
    })
    .eq("id", product.id);

  console.log(`Alert sent to ${owner.email}`);
}
      // Reset alert
      if (
        latestPrice > Number(product.target_price) &&
        product.alert_sent
      ) {
        await supabase
          .from("products")
          .update({
            alert_sent: false,
          })
          .eq("id", product.id);

        console.log(`Alert reset: ${product.title}`);
      }
    } catch (err) {
      console.error(`❌ ${product.title}`);
      console.error(err.message);
      continue;
    }
  }
}

module.exports = updateAllPrices;