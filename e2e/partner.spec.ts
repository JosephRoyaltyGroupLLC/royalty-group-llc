import { test, expect } from '@playwright/test';

test.describe('Partner Platform', () => {
  test('partner registration page renders correctly', async ({ page }) => {
    await page.goto('/partner/register');
    
    // Check that the registration page loads
    await expect(page.locator('text=Partner Registration')).toBeVisible();
    await expect(page.getByPlaceholder('e.g. Acme Properties LLC')).toBeVisible();
    
    // Check Google Sign In button is present
    await expect(page.getByRole('button', { name: 'Register with Google & Start Trial' })).toBeVisible();
  });

  test('partner dashboard redirects to login if unauthenticated', async ({ page }) => {
    await page.goto('/partner');
    
    // Wait for auth state to resolve and redirect
    // Since Firebase Auth will load and see no user, it should redirect to login
    await page.waitForURL('**/login*');
    await expect(page).toHaveURL(/.*login/);
  });
});
