import { test, expect } from '@playwright/test';

test.describe('Navigation and Core Pages', () => {
  test('homepage has correct title and renders hero section', async ({ page }) => {
    await page.goto('/');
    
    // Check that the homepage loads (basic text should be present)
    await expect(page.locator('text=Royalty Group LLC').first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'Apply for Housing' }).first()).toBeVisible();
  });

  test('can navigate to about page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'About Us' }).first().click();
    
    // Should navigate to about page
    await expect(page).toHaveURL(/.*about/);
  });

  test('can navigate to independent living page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Independent Living' }).first().click();
    
    await expect(page).toHaveURL(/.*independent-living/);
  });

  test('can navigate to properties page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Properties' }).first().click();
    
    await expect(page).toHaveURL(/.*properties/);
  });
  
  test('can navigate to contact us page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Contact Us' }).first().click();
    
    await expect(page).toHaveURL(/.*contact/);
  });
});
