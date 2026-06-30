const supabase = require("../config/supabase");
const scrapeProduct = require("../scraper");

// Add Product
const addProduct = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);
    const {
      user_id,
      title,
      product_url,
      target_price,
      current_price,
      image,
    } = req.body;

    const { data, error } = await supabase
      .from("products")
      .insert([
        {
          user_id,
          title,
          product_url,
          target_price,
          current_price,
          image,
          status: "Watching",
        },
      ])
      .select();

 if (error) {
  console.log("SUPABASE ERROR:", error);
  return res.status(500).json(error);
}

// Insert initial history record
await supabase
  .from("price_history")
  .insert([
    {
      product_id: data[0].id,
      price: current_price,
    },
  ]);

res.json(data[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Products
const getProducts = async (req, res) => {

  try {

    const { user_id } = req.query;

    const query = supabase
      .from("products")
      .select("*")
      .order("created_at", {
        ascending: false,
      });

    if (user_id) {
      query.eq("user_id", user_id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json(error);
    }

    res.json(data);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};
// Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    message: "Product deleted",
  });
};
const updateProduct = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      target_price
    } = req.body;

    const { data, error } =
      await supabase
        .from("products")
        .update({
          target_price
        })
        .eq("id", id)
        .select();

    if (error) {
      return res
        .status(500)
        .json(error);
    }

    res.json(data[0]);

  } catch (err) {

    res.status(500).json({
      message: err.message,
    });

  }

};
// Refresh a single product's live price (on-demand, called from "Sync" button)
const refreshProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: product, error: fetchError } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (fetchError || !product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const scraped = await scrapeProduct(product.product_url);

    if (!scraped || !scraped.price) {
      return res.status(502).json({
        message: "Could not fetch live price right now. Please try again shortly.",
      });
    }

    const latestPrice = Number(
      String(scraped.price).replace(/[^\d.]/g, "")
    );

    if (isNaN(latestPrice)) {
      return res.status(502).json({
        message: "Could not parse live price.",
      });
    }

    const { data: updated, error: updateError } = await supabase
      .from("products")
      .update({ current_price: latestPrice })
      .eq("id", id)
      .select();

    if (updateError) {
      return res.status(500).json(updateError);
    }

    if (latestPrice !== Number(product.current_price)) {
      await supabase
        .from("price_history")
        .insert([{ product_id: id, price: latestPrice }]);
    }

    res.json(updated[0]);
  } catch (err) {
    res.status(500).json({
      message: err.message || "Failed to refresh price",
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  deleteProduct,
  updateProduct,
  refreshProduct,
};