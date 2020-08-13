const puppeteer = require("puppeteer");
const assert = require("assert");
const { beforeEach, before, after } = require("mocha");
const { fail } = require("assert");
const fs = require("fs");

let browser;
let page;

before(async () => {
  browser = await puppeteer.launch({
    args: [
      "--remote-debugging-port=9222",
      "--mute-audio",
      "--disable-notifications",
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
    ],
    headless: false,
    executablePath: process.env.CHROMIUM_PATH,
  });

  const browserVersion = await browser.version();
  console.log(`Started ${browserVersion}`);
});

beforeEach(async () => {
  page = await browser.newPage();
});

describe("Google application", () => {
  it("sample puppeteer script", async () => {
    const response = await page.goto("https://www.google.com/", {
      waitUntil: "networkidle2",
    });
    assert(response.ok());
    await page.type(".gLFyf", "srinivasansekar/n");
    browser.close();
  });
});

after(async () => {
  await browser.close();
});
