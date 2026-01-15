import { test, expect } from '@playwright/test';

test('Redirection vers login si tentative de réservation sans compte', async ({ page }) => {

  await page.goto('/rooms/1');

  await page.fill('input[name="startTime"]', '2024-12-25T10:00');
  await page.fill('input[name="endTime"]', '2024-12-25T11:00');

  await page.click('button[type="submit"]');

  await expect(page).toHaveURL(/.*login/);
});