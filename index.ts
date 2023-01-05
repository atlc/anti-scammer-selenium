import firefox from "selenium-webdriver/firefox";
import { Builder, By } from "selenium-webdriver";
import Random from "./data";

const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSdixaH0UgSJJpW4j1IHZetbg2FL4JNI9qQYtzR_mFN7Abu5rQ/viewform";

let counter = 0;

(async () => {
    try {
        const options = new firefox.Options().headless();
        const driver = new Builder().forBrowser("firefox").setFirefoxOptions(options).build();
        await driver.get(FORM_URL);

        async function fillForm() {
            counter++;
            const person = Random.person();
            const alt = Random.college();

            const email = `${person.email_name}@jeffersonstate.edu`;
            const alt_email = `${person.alt_email_name}@${alt.hostname}`;
            const password = Random.password();
            const alt_password = Random.password();
            const alt_phone = Random.phone();

            const hasAlt = Math.random() > 0.2;
            const nameInsteadOfYes = Math.random() > 0.5;
            const reusesPW = Math.random() > 0.4;
            const sameNum = Math.random() > 0.85;

            // console.log({
            //     person,
            //     alt_college: alt,
            //     hasAlt,
            //     email,
            //     alt_email,
            //     password,
            //     alt_password,
            //     reusesPW,
            //     phone: person.phone,
            //     alt_phone,
            //     sameNum
            // });

            /*
                [
                    Alt college YES/NO,
                    Full Name,
                    Alt college name if yes,
                    Alt email if yes,
                    Alt pwd if yes,
                    Alt phone number,
                    JSCC email,
                    JSCC pass (same or gen new random),
                    JSCC phone
                ]
            */
            const inputs = await driver.findElements(By.css('input[type="text"]'));
            const checkbox = await driver.findElement(By.css("div[role='checkbox']"));
            const submitButton = await driver.findElement(By.css("span > span"));

            Promise.all([
                inputs[0].sendKeys(hasAlt ? (nameInsteadOfYes ? alt.name : Random.yes()) : Random.no()),
                inputs[1].sendKeys(person.joint),

                inputs[2].sendKeys(hasAlt ? alt.name : Random.no()),
                inputs[3].sendKeys(hasAlt ? alt_email : Random.no()),
                inputs[4].sendKeys(hasAlt ? (reusesPW ? password : alt_password) : Random.no()),
                inputs[5].sendKeys(hasAlt ? (sameNum ? person.phone : alt_phone) : Random.no()),

                inputs[6].sendKeys(email),
                inputs[7].sendKeys(password),
                inputs[8].sendKeys(person.phone),
                console.log(`Count says: ${counter} submissions, ah ah ahhhh!`)
            ])
                .then(() => checkbox.click())
                .then(() => submitButton.click())
                .then(() => loop()); // Enables infinite loop!
        }
        fillForm();

        async function loop() {
            await driver.findElement(By.css("a")).click();
            fillForm();
        }
    } catch (error) {}
})();
