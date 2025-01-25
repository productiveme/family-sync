import { test, expect } from '@playwright/test';

test.describe('Activities', () => {
  test.beforeEach(async ({ page }) => {
    // Login before each test
    await page.goto('/login');
    await page.fill('input[name="email"]', 'parent@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
  });

  test('should create new activity', async ({ page }) => {
    await page.goto('/activities/new');
    
    await page.fill('input[name="title"]', 'Math Homework');
    await page.fill('textarea[name="description"]', 'Complete chapter 5 exercises');
    await page.fill('input[name="date"]', '2024-03-20');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('/activities');
    await expect(page.locator('.activity-title')).toContainText('Math Homework');
  });

  test('should edit activity', async ({ page }) => {
    await page.goto('/activities');
    await page.click('.activity-item >> text=Math Homework');
    await page.click('.edit-button');
    
    await page.fill('input[name="title"]', 'Updated Math Homework');
    await page.click('button[type="submit"]');

    await expect(page.locator('.activity-title')).toContainText('Updated Math Homework');
  });

  test('should delete activity', async ({ page }) => {
    await page.goto('/activities');
    await page.click('.activity-item >> text=Math Homework');
    await page.click('.delete-button');
    
    await page.click('.confirm-delete-button');

    await expect(page.locator('text=Math Homework')).not.toBeVisible();
  });
});
