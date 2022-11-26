/* eslint-disable prettier/prettier */
const puppeteer = require('puppeteer');

const URL = 'https://kate-chu.github.io/parking_genie/';

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
  );

  // open homepage
  await page.goto(URL);

  // enable location permission
  const context = browser.defaultBrowserContext();
  await context.overridePermissions(URL, ['geolocation']);
  const [latitude, longitude] = [25.07725653420882, 121.57580794282283];
  await page.setGeolocation({
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
  });

  // waiting for the page to load
  await page.waitForSelector(
    "img[src='/parking_genie/static/media/car.19293be55d48d49d0c5e.png']",
  );
  await page.waitForSelector('#search-form', { visible: true });

  // test search form
  await page.focus('#destination');
  await page.type('#destination', '台灣大學', { delay: 300 });
  await page.waitForSelector('#geo-search-ul', { delay: 1000 });
  await page.screenshot({ path: 'leaflet-geosearch.png', delay: 5000 });
  await page.keyboard.down('Enter');

  // test search result
  await page.waitForSelector(
    "img[src='/parking_genie/static/media/destination.a44fca73ba01f2baaee3.png']",
    { visible: true },
  );
  await page.waitForSelector('#sidebar', { visible: true });
  await page.waitForSelector('#sidebar > ul > li:last-child', {
    visible: true,
    delay: 10000,
  });
  await page.screenshot({ path: 'after-submit-search.png', delay: 30000 });

  // test click navigation button
  await page.focus('#sidebar > ul > li:first-child > button', {
    delay: 10000,
    visible: true,
  });

  await page.click('#sidebar > ul > li:first-child > button', {
    delay: 1000,
    visible: true,
  });

  // pending: research how to screenshot the new page and delay for closing the browser
  // await page.screenshot({ path: "after-click-navigation.png", delay: 5000 });
  // await browser.close();
})();
