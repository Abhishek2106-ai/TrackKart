const { chromium } = require("playwright");

async function scrapeAmazon(url) {

  const browser = await chromium.launch({
    headless: true
  });

  try {

    const context = await browser.newContext({

      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/137.0.0.0 Safari/537.36",

      locale: "en-IN",

      timezoneId: "Asia/Kolkata",

      viewport: {
        width: 1366,
        height: 768
      }

    });

    const page = await context.newPage();

    await page.goto(url, {
      waitUntil: "domcontentloaded",
      timeout: 30000
    });

    try {
      await page.waitForSelector(
        "#productTitle, .a-price .a-offscreen",
        { timeout: 8000 }
      );
    } catch {
      // proceed anyway — selectors below will retry/handle missing data
    }

    if (
      (await page.content()).includes("Enter the characters you see below")
    ) {
      throw new Error("Amazon CAPTCHA detected");
    }

    const titleSelectors = [
      "#productTitle",
      "#title",
      "h1 span"
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

    const priceSelectors = [

      ".a-price .a-offscreen",

      ".apexPriceToPay .a-offscreen",

      ".priceToPay .a-offscreen",

      "#corePriceDisplay_desktop_feature_div .a-offscreen"

    ];

    let price = "";

    for (const selector of priceSelectors) {

      const locator = page.locator(selector);

      if (await locator.count()) {

        price = (
          await locator.first().textContent()
        )?.trim();

        if (price) break;
      }

    }

    let image = "";

    const imageSelectors = [

      "#landingImage",

      "#imgBlkFront",

      "#ebooksImgBlkFront"

    ];

    for (const selector of imageSelectors) {

      const locator = page.locator(selector);

      if (await locator.count()) {

        image = await locator.first().getAttribute("src");

        if (image) break;

      }

    }

    if (!title || !price) {

      await page.screenshot({
        path: "amazon-error.png",
        fullPage: true
      });

      throw new Error("Amazon product details not found");

    }

    await browser.close();

    return {

      title,

      price,

      image

    };

  } catch (err) {

    await browser.close();

    throw err;

  }

}

module.exports = scrapeAmazon;