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
    // Vérification : on est bien sur une URL de détail de salle (avec un ID numérique)
    await expect(page).toHaveURL(/.*rooms\/\d+/);
  });

  // ÉTAPE 3 : Remplissage et soumission du formulaire
  await test.step('3. Tentative de réservation', async () => {
    // On met une date dans le futur pour éviter les erreurs de validation
    await page.fill('input[name="startTime"]', '2026-05-20T10:00');
    await page.fill('input[name="endTime"]', '2026-05-20T11:00');

    // Clic sur le bouton de confirmation
    await page.getByRole('button', { name: /Confirmer/i }).click();
  });

  // ÉTAPE 4 : Vérification de la redirection de sécurité
  await test.step('4. Redirection automatique vers la connexion', async () => {
    // L'utilisateur n'étant pas connecté, il doit être renvoyé vers /login
    await expect(page).toHaveURL(/.*login/);
  });

  // ÉTAPE 5 : Connexion
  await test.step('5. Connexion de l\'utilisateur', async () => {
    // On utilise les identifiants définis en haut du fichier
    await page.fill('input[name="email"]', TEST_USER.email); 
    await page.fill('input[name="password"]', TEST_USER.password);

    // Soumission du formulaire de connexion
    await page.click('button:has-text("Se connecter")');
    
    // Vérification immédiate : si on voit un message d'erreur, on fait échouer le test tout de suite
    const errorMessage = page.locator('.text-red-500, [role="alert"]');
    if (await errorMessage.isVisible()) {
      throw new Error(`Échec de la connexion : ${await errorMessage.innerText()}`);
    }
  });

  // ÉTAPE 6 : Vérification du retour à l'accueil
  await test.step('6. Retour à l\'accueil authentifié', async () => {
    // Après connexion, l'action serveur doit rediriger vers l'accueil
    await expect(page).toHaveURL('http://127.0.0.1:3000/');
    
    // Preuve ultime de connexion : le bouton "Mes Réservations" est visible
    await expect(page.getByText('Mes Réservations')).toBeVisible();
  });

});