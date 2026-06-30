const supabase = require("../config/supabase");

// Overview stats for the admin dashboard
const getStats = async (req, res) => {
  try {
    const { data: users, error: usersError } = await supabase
      .from("users")
      .select("id, is_verified, is_admin, created_at");

    if (usersError) return res.status(500).json(usersError);

    const { data: products, error: productsError } = await supabase
      .from("products")
      .select("id, current_price, target_price, created_at, user_id");

    if (productsError) return res.status(500).json(productsError);

    const { count: historyCount } = await supabase
      .from("price_history")
      .select("id", { count: "exact", head: true });

    const activeAlerts = (products || []).filter(
      (p) => Number(p.current_price) <= Number(p.target_price)
    ).length;

    const totalSavings = (products || []).reduce((sum, p) => {
      const diff = Number(p.target_price) - Number(p.current_price);
      return sum + (diff > 0 ? diff : 0);
    }, 0);

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const newUsersThisWeek = (users || []).filter(
      (u) => u.created_at && new Date(u.created_at) >= sevenDaysAgo
    ).length;

    res.json({
      totalUsers: users?.length || 0,
      verifiedUsers: (users || []).filter((u) => u.is_verified).length,
      adminUsers: (users || []).filter((u) => u.is_admin).length,
      newUsersThisWeek,
      totalProducts: products?.length || 0,
      activeAlerts,
      totalSavings,
      priceHistoryRecords: historyCount || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// All registered users (without password hashes / OTP secrets)
const getAllUsers = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("id, name, email, is_verified, is_admin, created_at")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json(error);

    res.json(data || []);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// All tracked products, system-wide, joined with the owner's basic info
const getAllProducts = async (req, res) => {
  try {
    const { data: products, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) return res.status(500).json(error);

    const { data: users } = await supabase
      .from("users")
      .select("id, name, email");

    const userMap = new Map((users || []).map((u) => [u.id, u]));

    const enriched = (products || []).map((p) => ({
      ...p,
      owner: userMap.get(p.user_id) || null,
    }));

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Promote / demote a user's admin status
const setUserAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const { is_admin } = req.body;

    const { data, error } = await supabase
      .from("users")
      .update({ is_admin: !!is_admin })
      .eq("id", id)
      .select();

    if (error) return res.status(500).json(error);

    if (!data?.length) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove a user account entirely
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await supabase.from("products").delete().eq("user_id", id);

    const { error } = await supabase.from("users").delete().eq("id", id);

    if (error) return res.status(500).json(error);

    res.json({ message: "User deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Remove any tracked product, regardless of owner
const deleteAnyProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) return res.status(500).json(error);

    res.json({ message: "Product deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getStats,
  getAllUsers,
  getAllProducts,
  setUserAdmin,
  deleteUser,
  deleteAnyProduct,
};
