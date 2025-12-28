import puppeteer from 'puppeteer';

let endpoint = "http://localhost:5173/it/lago-maggiore/mercati/mercato-luino";
if (process.env.SK_DEPLOYMENT_URL) {
  endpoint = `${process.env.SK_DEPLOYMENT_URL}/it/lago-maggiore/mercati/mercato-luino`;
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
    // Set viewport
    await page.setViewport({ width: 1280, height: 720 });
    
    // Go to the specified page
    await page.goto(endpoint, { waitUntil: "networkidle0" });
    
    // Find and click the purchase button - updated selector to match the Svelte component
    const buttonSelector = 'button.bg-yellow-400';
    console.log('Waiting for button with selector:', buttonSelector);
    
    await page.waitForSelector(buttonSelector, {
      timeout: 30000,
      visible: true
    });
    
    // Add a small delay using Promise
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Click the button and log the action
    console.log('Clicking the purchase button');
    await page.click(buttonSelector);
    
    // Wait for the Stripe iframe to appear and load
    console.log('Waiting for Stripe iframe');
    await page.waitForSelector('#checkout iframe[name="embedded-checkout"]', {
      timeout: 30000
    });
    
    // Verify that the Stripe checkout iframe exists and has the correct attributes
    const stripeFrame = await page.$('#checkout iframe[name="embedded-checkout"]');
    if (!stripeFrame) {
      console.error("Stripe checkout iframe not found");
      process.exit(1);
    }
    
    // Get iframe attributes to verify it's the Stripe checkout
    const frameAttributes = await page.evaluate(frame => {
      return {
        name: frame.getAttribute('name'),
        src: frame.getAttribute('src'),
        allow: frame.getAttribute('allow')
      };
    }, stripeFrame);
    
    // Verify the iframe has the expected attributes
    if (!frameAttributes.src.includes('stripe.com/v3/embedded-checkout')) {
      console.error("Iframe source is not from Stripe");
      process.exit(1);
    }
    
    console.log("Stripe checkout iframe found and verified");
    
    if (errorFound) {
      console.log("Errors found in the console.");
      process.exit(1);
    } else {
      console.log("Test completed successfully");
      process.exit(0);
    }
  } catch (error) {
    console.error("Error during test:", error);
    
    // Additional debug information if the button is not found
    if (error.message.includes('waiting for selector')) {
      try {
        // Log the page content to help debug
        const bodyHTML = await page.evaluate(() => document.body.innerHTML);
        console.log('Page content:', bodyHTML);
        
        // Log all buttons on the page
        const buttons = await page.evaluate(() => 
          Array.from(document.querySelectorAll('button')).map(button => ({
            text: button.textContent,
            classes: button.className
          }))
        );
      } catch (debugError) {
        console.error('Error while trying to debug:', debugError);
      }
    }
    
    process.exit(1);
  } finally {
    await browser.close();
  }
})();
