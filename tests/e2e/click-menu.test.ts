import { test, expect } from '@playwright/test'

test('click menu', async ({ page }) => {
  await page.goto('/')

  const button = page.locator('[data-ident="confirm-disclaimer-button"]')
  await button.click()

  const overlay = page.locator('[data-ident="overlay"]')
  await expect(overlay).not.toBeVisible()

  const menuButton = page.locator('[data-ident="menu-button"]')
  await menuButton.click()

  const menu = page.locator('[data-ident="menu"]')
  await expect(menu).toBeVisible()
})
