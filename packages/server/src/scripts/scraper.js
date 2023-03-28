const puppeteer = require("puppeteer");
const fs = require("fs");

async function headers() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers");

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("section"), (section) => {
      const category =
        section.querySelector("h2 a")?.textContent.trim() ?? null;

      const info = Array.from(section.querySelectorAll("dt"), (data) => {
        const code = data.querySelector("code")?.textContent ?? null;
        const link = data.querySelector("a")?.getAttribute("href") ?? null;
        return { code, link };
      });

      const descriptions = Array.from(
        section.querySelectorAll("dd"),
        (description) => description.querySelector("p")?.textContent ?? null
      );

      const content = Array.from(info, (data, index) => ({
        code: data.code,
        description: descriptions[index],
        source: "https://developer.mozilla.org" + data.link,
      }));

      return { category, content };
    })
  );

  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(__dirname + '/../docs/headers.json', content);

  await browser.close();
}

async function methods() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods");

  const data = await page.evaluate(() => {
    const info = Array.from(document.querySelectorAll("dt"), (data) => {
      const code = data.querySelector("code")?.textContent ?? null;
      const link = data.querySelector("a")?.getAttribute("href") ?? null;
      return { code, link };
    });

    const descriptions = Array.from(
      document.querySelectorAll("dd"),
      (description) => description.querySelector("p")?.textContent ?? null
    );

    const content = Array.from(info, (data, index) => ({
      code: data.code,
      description: descriptions[index],
      source: "https://developer.mozilla.org" + data.link,
    }));

    return content;
  });

  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(__dirname + '/../docs/methods.json', content);

  await browser.close();
}

async function status() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://developer.mozilla.org/en-US/docs/Web/HTTP/Status");

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("section"), (section) => {
      const category =
        section.querySelector("h2 a")?.textContent.trim() ?? null;

      const info = Array.from(section.querySelectorAll("dt"), (data) => {
        const code = data.querySelector("code")?.textContent ?? null;
        const link = data.querySelector("a")?.getAttribute("href") ?? null;
        return { code, link };
      });

      const descriptions = Array.from(
        section.querySelectorAll("dd"),
        (description) => description.querySelector("p")?.textContent ?? null
      );

      const content = Array.from(info, (data, index) => ({
        code: data.code,
        description: descriptions[index],
        source: "https://developer.mozilla.org" + data.link,
      }));

      return { category, content };
    })
  );

  const content = JSON.stringify(data, null, 2);
  fs.writeFileSync(__dirname + '/../docs/status.json', content);

  await browser.close();
}
