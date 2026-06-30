const supabase = require("../config/supabase");

const getPriceHistory = async (req, res) => {

  const { productId } = req.params;

  const { data, error } = await supabase
    .from("price_history")
    .select("*")
    .eq("product_id", productId)
    .order("created_at", {
      ascending: true
    });

  if (error) {
    return res.status(500).json(error);
  }

  res.json(data);
};

module.exports = {
  getPriceHistory,
};