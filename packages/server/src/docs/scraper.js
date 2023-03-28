const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers");

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("section"), (t) => {
      const category = t.querySelector("h2 a")?.textContent.trim() ?? null;
      const content = Array.from(t.querySelectorAll("div"), (c) => {
        const title = c.querySelector("code")?.textContent.trim() ?? null;
        const description = t.querySelector("p")?.textContent.trim() ?? null;
        const source = t.querySelector("dt a")?.getAttribute('href')

        return {category, title, description, source: 'https://developer.mozilla.org/' + source}
      });
      return { category, content };
    })
  );

  const content = JSON.stringify(data, null, 2)
  fs.writeFileSync('headers.json', content)

  await browser.close();
})();
