import { test, expect } from '@playwright/test'

test('confirm disclaimer', async ({ page }) => {
  await page.goto('/')

  const button = page.locator('[data-ident="confirm-disclaimer-button"]')
  await button.click()

  const overlay = page.locator('[data-ident="overlay"]')
  await expect(overlay).not.toBeVisible()
})
