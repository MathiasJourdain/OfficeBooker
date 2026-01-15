import { test, expect } from '@playwright/test';

test('La page d\'accueil charge correctement', async ({ page }) => {

  await page.goto('/');

  await expect(page.getByRole('heading', { name: /Bienvenue sur OfficeBooker/i })).toBeVisible();

  await expect(page.getByRole('button', { name: /Ajouter une salle/i })).toBeVisible();

  await expect(page.getByText(/Rechercher/i)).toBeVisible();
});

test('Navigation vers la page de connexion', async ({ page }) => {
  await page.goto('/');
  await page.click('text=Connexion');

  await expect(page).toHaveURL(/.*login/);
});