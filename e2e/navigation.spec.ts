import { test, expect } from '@playwright/test';

test.describe('Navigation and Core Pages', () => {
  test('homepage has correct title and renders hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check that the homepage loads (basic text should be present)
    await expect(page.locator('text=Royalty Group LLC').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Explore Our Divisions' }).first()).toBeVisible();
  });

  test('can navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About Us' }).first().click();
    
    // Should navigate to about page
    await expect(page).toHaveURL(/.*about/);
  });

  test('can navigate to homes division page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Our Divisions' }).click();
    await page.getByRole('link', { name: 'Royalty Group Homes' }).first().click();
    
    await expect(page).toHaveURL(/.*homes/);
  });

  test('can navigate to contracting page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('button', { name: 'Our Divisions' }).click();
    await page.getByRole('link', { name: 'Royalty Group Contracting' }).first().click();
    
    await expect(page).toHaveURL(/.*contractor-services/);
  });
  
  test('can navigate to contact us page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact Us' }).first().click();
    
    await expect(page).toHaveURL(/.*contact/);
  });
});
