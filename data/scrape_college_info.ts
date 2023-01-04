import { Builder, By } from "selenium-webdriver";
import * as fs from "fs";

(async () => {
    const AL_COLLEGES = "https://college.ai/Colleges/Alabama-Colleges.html";

    const driver = new Builder().forBrowser("firefox").build();
    await driver.get(AL_COLLEGES);

    const results = [];

    const links = (await driver.findElements(By.css("tbody a"))).map(async element => (await element.getAttribute("href")).replace("..", "https://college.ai"));

    console.log({ links: Promise.all(links) });

    for await (const link of links) {
        try {
            await driver.get(link);

            const name = (await (await driver.findElement(By.css("h1"))).getAttribute("textContent")).trim();
            const site = await (await driver.findElement(By.xpath("/html/body/div[2]/div[2]/div/section/div/div[1]/p[4]/a"))).getAttribute("href");

            const hostname = new URL(site).hostname.replace(/www\d?\./, "");

            results.push({ name, site, hostname });
        } catch (error) {}
    }

    fs.writeFileSync("colleges.json", JSON.stringify(results));
})();
