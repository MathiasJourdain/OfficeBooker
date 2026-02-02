import { test, expect } from '@playwright/test';

const TEST_USER = {
  email: 'mathias.jourdain2020@gmail.com',
  password: 'Mathias2020.'
};

test('Parcours complet de réservation avec authentification forcée', async ({ page }) => {

  await test.step('1. Accès à la page d\'accueil (Non connecté)', async () => {
    await page.goto('/');
    const roomLink = page.locator('a[href^="/rooms/"]').filter({ hasText: /Voir/ }).first();
    await expect(roomLink).toBeVisible({ timeout: 10000 });
  });

  await test.step('2. Accès à la page de réservation', async () => {
    const roomLink = page.locator('a[href^="/rooms/"]').filter({ hasText: /Voir/ }).first();
    await roomLink.click();
    await expect(page).toHaveURL(/.*rooms\/\d+/);
  });

  await test.step('3. Tentative de réservation', async () => {
    await page.fill('input[name="startTime"]', '2026-05-20T10:00');
    await page.fill('input[name="endTime"]', '2026-05-20T11:00');

    await page.getByRole('button', { name: /Confirmer/i }).click();
  });

  await test.step('4. Redirection automatique vers la connexion', async () => {
    await expect(page).toHaveURL(/.*login/);
  });

  await test.step('5. Connexion de l\'utilisateur', async () => {
    await page.waitForSelector('input[name="email"]', { state: 'visible' });
    
    await page.fill('input[name="email"]', TEST_USER.email); 
    await page.fill('input[name="password"]', TEST_USER.password);

    await page.click('button:has-text("Se connecter")');
    
    try {
      await expect(page).not.toHaveURL(/.*login/, { timeout: 5000 });
    } catch (e) {
      const alert = page.getByRole('alert'); 
      if (await alert.isVisible()) {
        const text = await alert.innerText();
        throw new Error(`🛑 Connexion refusée par le site. Message : "${text}"`);
      } else {
        throw new Error(`🛑 Le site est resté bloqué sur /login sans message d'erreur visible.`);
      }
    }
  });

  await test.step('6. Retour à l\'accueil authentifié', async () => {
    await expect(page).toHaveURL('http://127.0.0.1:3000/');
    
    await expect(page.getByText('Mes Réservations')).toBeVisible();
  });

});