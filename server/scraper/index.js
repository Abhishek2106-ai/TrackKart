const scrapeAmazon =
  require("./amazonScraper");

const scrapeFlipkart =
  require("./flipkartScraper");

async function scrapeProduct(url) {

  if (url.includes("amazon")) {
    return await scrapeAmazon(url);
  }

  if (url.includes("flipkart")) {
    return await scrapeFlipkart(url);
  }

  throw new Error(
    "Website not supported"
  );
}

module.exports = scrapeProduct;