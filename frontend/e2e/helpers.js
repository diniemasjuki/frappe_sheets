import { expect } from '@playwright/test'

export const MOD = process.platform === 'darwin' ? 'Meta' : 'Control'

export async function openNewSheet(page) {
  await page.goto('/sheets')
  await expect(page.locator('#root')).toBeVisible()

  await page.getByRole('button', { name: /^New Spreadsheet$/ }).click()

  await expect(page.locator('.sn-topbar-right')).toBeVisible({ timeout: 15_000 })
}
