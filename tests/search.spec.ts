import { test, expect } from '@playwright/test';

test('Le filtre de recherche fonctionne', async ({ page }) => {
  await page.goto('/');

  await expect(page.getByText('Voir le planning').first()).toBeVisible();

  const searchInput = page.getByPlaceholder('Ex: Salle Jeff Bezos...');
  await searchInput.fill('Jeff');
  await page.waitForTimeout(1000); 
  await expect(page.getByText('Salle Jeff Bezos')).toBeVisible();

  await expect(page.getByText('Salle Steve Jobs')).not.toBeVisible();
});