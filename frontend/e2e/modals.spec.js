import { test, expect } from '@playwright/test'
import { openNewSheet, MOD } from './helpers.js'

test.describe('modals', () => {
  test('filter toolbar button toggles the filter overlay', async ({ page }) => {
    await openNewSheet(page)

    const filterBtn = page.getByRole('button', { name: 'Toggle filter' })
    await filterBtn.click()
    await expect(page.locator('.sn-filter-overlay')).toBeVisible()

    await filterBtn.click()
    await expect(page.locator('.sn-filter-overlay')).toBeHidden()
  })

  test('Cmd/Ctrl+F opens the Find & Replace panel; Esc closes it', async ({ page }) => {
    await openNewSheet(page)

    await page.keyboard.press(`${MOD}+F`)
    const panel = page.locator('.fr-panel')
    await expect(panel).toBeVisible({ timeout: 5_000 })
    await expect(panel.getByText(/Find\s*&\s*Replace/i)).toBeVisible()

    await panel.getByRole('button').first().click()
    await expect(panel).toBeHidden({ timeout: 5_000 })
  })

  test('Share button opens the share dialog', async ({ page }) => {
    await openNewSheet(page)

    await page.getByRole('button', { name: /^Share/ }).click()

    const dialog = page.getByRole('dialog')
    await expect(dialog).toBeVisible({ timeout: 5_000 })
    await expect(dialog.getByText(/Share/i).first()).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden({ timeout: 5_000 })
  })
})
