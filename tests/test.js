import { test, expect } from "@playwright/test";
import { email, password } from "../user.js";

test.describe("authorization check", () => {
  test("authorization succes", async ({ page }, testInfo) => {
    await page.goto("https://netology.ru/");
    await page.getByRole("link", { name: "Войти" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Пароль").click();
    await page.getByPlaceholder("Пароль").fill(password);
    await page.getByTestId("login-submit-btn").click();
    await page.screenshot({ path: `screenshot/${testInfo.title}.png` });
    const locator = await page.getByRole("heading", {
      name: "Мои курсы и профессии",
    });

    await expect(page).toHaveURL(/profile/);
    await expect(locator).toHaveText("Мои курсы и профессии");
  });

  test("authorization unsuccess", async ({ page }, testInfo) => {
    await page.goto("https://netology.ru/");
    await page.getByRole("link", { name: "Войти" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Пароль").click();
    await page.getByPlaceholder("Пароль").fill("123456");
    await page.getByTestId("login-submit-btn").click();
    await page.screenshot({ path: `screenshot/${testInfo.title}.png` });
    const locator = await page.getByTestId("login-error-hint");

    await expect(locator).toHaveText("Вы ввели неправильно логин или пароль");
  });
});
