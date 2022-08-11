const puppeteer = require("puppeteer");
const path = require("path");

const browserOptions = {
  headless: true,
  ignoreHTTPSErrors: true,
};

let browser;
let page;

beforeAll(async () => {
  browser = await puppeteer.launch(browserOptions);
  page = await browser.newPage();
  await page.goto("file://" + path.resolve("./index.html"));
}, 30000);

afterAll((done) => {
  try {
    this.puppeteer.close();
  } catch (e) { }
  done();
});

describe("Links", () => {
  it("Page should contain a total of 3 `Section` tags", async () => {
    const sections = await page.$$("section");
    expect(sections.length).toBe(3);
  });
  it("Page should contain a total of 3 `Anchor` tags", async () => {
    const anchors = await page.$$("a");
    expect(anchors.length).toBe(3);
  })
  it("Page should contain an `Anchor` tag linking to 'google.com'", async () => {
    const anchors = await page.$$eval('a', el => Array.from(el).map(a => a.href));
    const googleLink = anchors.find(link => link.includes("google.com"));
    expect(googleLink).toBeDefined();
    expect(googleLink).toMatch(/www.google.com/);
  });
  it("Page should contain an `Anchor` tag linking to 'stackoverflow.com'", async () => {
    const anchors = await page.$$eval('a', el => Array.from(el).map(a => a.href));
    const googleLink = anchors.find(link => link.includes("stackoverflow.com"));
    expect(googleLink).toBeDefined();
    expect(googleLink).toMatch(/www.stackoverflow.com/);
  });
  it("Page should contain a `mailto:` link", async () => {
    const mailtoLink = await page.$('a[href^="mailto:"]');
    expect(mailtoLink).toBeTruthy();
  });
});