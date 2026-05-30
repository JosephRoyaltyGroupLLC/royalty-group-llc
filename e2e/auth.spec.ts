import { test, expect } from '@playwright/test';

test.describe('Authentication UI', () => {
  test('login page renders correctly with portal options', async ({ page }) => {
    await page.goto('/login');
    
    // Check that the login options are visible
    await expect(page.getByRole('button', { name: 'Resident' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Navigator' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Partner' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Admin' })).toBeVisible();
    
    // Check Google Sign In button
    await expect(page.getByRole('button', { name: 'Sign in with Google' })).toBeVisible();
  });
  
  test('portal type selector changes active state', async ({ page }) => {
    await page.goto('/login');
    
    const partnerBtn = page.getByRole('button', { name: 'Partner' });
    const adminBtn = page.getByRole('button', { name: 'Admin' });
    
    // Click Partner
    await partnerBtn.click();
    // It should now have the active styling classes (bg-white text-primary)
    await expect(partnerBtn).toHaveClass(/bg-white/);
    
    // Click Admin
    await adminBtn.click();
    await expect(adminBtn).toHaveClass(/bg-white/);
    // Partner button should lose the active styling
    await expect(partnerBtn).not.toHaveClass(/bg-white/);
  });
});
