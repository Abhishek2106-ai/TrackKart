const supabase = require("./config/supabase");

async function test() {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) {
    console.log("❌ Error:", error.message);
  } else {
    console.log("✅ Connected!");
    console.log(data);
  }
}

test();