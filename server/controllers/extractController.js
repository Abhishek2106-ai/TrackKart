const scrapeProduct =
require("../scraper");

const extractProduct = async (req, res) => {
  try {
    console.log("REQUEST BODY:", req.body);

    const { url } = req.body;

const data =
await scrapeProduct(url);
    console.log("SCRAPED DATA:", data);

    return res.json(data);

  } catch (error) {

    console.error("FULL ERROR:");
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
      stack: error.stack
    });
  }
};

module.exports = {
  extractProduct,
};