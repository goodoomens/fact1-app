import { test, expect } from '@playwright/test'

test('click menu (mobile) or verify no menu overlay (desktop)', async ({ page }) => {
  await page.goto('/')

  const button = page.locator('[data-ident="confirm-disclaimer-button"]')
  await button.click()

  const overlay = page.locator('[data-ident="overlay"]')
  await expect(overlay).not.toBeVisible()

  const menuButton = page.locator('[data-ident="menu-button"]')
  const menu = page.locator('[data-ident="menu"]')

  if (await menuButton.count() > 0 && await menuButton.first().isVisible()) {
    await menuButton.click()
    await expect(menu).toBeVisible()
  } else {
    await expect(menu).toHaveCount(0)
  }
})
