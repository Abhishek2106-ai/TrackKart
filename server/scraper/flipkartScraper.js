const { chromium } = require("playwright");

async function scrapeFlipkart(url) {
  const browser = await chromium.launch({
    headless: true,
  });

  try {
    const context = await browser.newContext({
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",

      locale: "en-IN",

      timezoneId: "Asia/Kolkata",

      viewport: {
        width: 1366,
        height: 768,
      },
    });

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 90000,
    });

    await page.waitForTimeout(5000);

    console.log("Current URL:", page.url());
    console.log("Page Title:", await page.title());

    // ---------------- TITLE ----------------

    const titleSelectors = [
      "span.VU-ZEz",
      "h1",
      "h1 span",
    ];

    let title = "";

    for (const selector of titleSelectors) {
      const locator = page.locator(selector);

      if (await locator.count()) {
        title = (
          await locator.first().textContent()
        )?.trim();

        if (title) break;
      }
    }

    // ---------------- PRICE ----------------

let price = "";

const priceLocator = page.locator(
  "div.Nx9bqj.CxhGGd, div.Nx9bqj"
);

if (await priceLocator.count()) {
  price = (
    await priceLocator.first().textContent()
  )?.trim();
}

if (!price) {

  const rupeeTexts = await page.locator("text=/₹[0-9,]+/").allTextContents();

  for (const text of rupeeTexts) {

    const match = text.match(/₹[\d,]+/);

    if (match) {

      const value = Number(
        match[0].replace(/[₹,]/g, "")
      );

      // Ignore tiny values and absurdly large values
      if (value > 1000 && value < 10000000) {
        price = match[0];
        break;
      }

    }

  }

}

console.log("PRICE:", price);

    // ---------------- IMAGE ----------------

let image = "";

const imageLocator = page.locator("img");

const count = await imageLocator.count();

for (let i = 0; i < count; i++) {

  const src = await imageLocator.nth(i).getAttribute("src");

  if (
    src &&
    src.startsWith("http") &&
    !src.includes("flipkart") &&
    !src.includes("svg")
  ) {
    image = src;
    break;
  }

}

console.log("IMAGE:", image);
    await browser.close();

    return {
      title,
      price,
      image,
    };
  } catch (err) {
    await browser.close();
    throw err;
  }
}

module.exports = scrapeFlipkart;