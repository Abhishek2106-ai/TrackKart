const supabase = require("../config/supabase");

// Lightweight admin gate consistent with the rest of this app's auth model
// (no server sessions yet — the client passes the logged-in user's id and
// we verify the is_admin flag against the database on every request).
const requireAdmin = async (req, res, next) => {
  try {
    const adminId =
      req.headers["x-user-id"] ||
      req.query.admin_id ||
      req.body?.admin_id;

    if (!adminId) {
      return res.status(401).json({ message: "Missing admin credentials." });
    }

    const { data: user, error } = await supabase
      .from("users")
      .select("id, is_admin")
      .eq("id", adminId)
      .single();

    if (error || !user || !user.is_admin) {
      return res.status(403).json({ message: "Admin access required." });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { requireAdmin };
