import puppeteer from 'puppeteer';

let endpoint = "http://localhost:5173/it";
// let endpoint = "https://valpiccola--38.milhos.tech/it";
if (process.env.SK_DEPLOYMENT_URL) {
  endpoint = `${process.env.SK_DEPLOYMENT_URL}/it`;
}

console.log(`Checking URL: ${endpoint}`);

(async () => {
  let errorFound = false;
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  
  const page = await browser.newPage();
  
  // Listen for console messages and report any errors
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      console.log(`Console error message: ${msg.text()}`);
      errorFound = true;
    }
  });

  try {
    // Set viewport (optional)
    await page.setViewport({ width: 1280, height: 720 });
    
    // Go to the specified page
    await page.goto(endpoint, { waitUntil: "networkidle0" });
    
    // Wait for 5 seconds using setTimeout
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Check if any errors were found in the console
    if (errorFound) {
      console.log("Errors found in the console.");
      process.exit(1);
    } else {
      console.log("No console errors found.");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error while making request:", error);
    process.exit(1);
  } finally {
    await browser.close();
  }
})();