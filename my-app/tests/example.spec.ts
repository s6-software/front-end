import {test, expect} from '@playwright/test';

const testUser = {
  email: 'john@doe.com',
  password: 'Super-Password12!',
  username: 'JohnDoe',
}
// open app test
test('Open page', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await expect(page.title()).resolves.toMatch('Create Next App');
});

//Routing test
test('Click button and check URL', async ({ page }) => {
  await page.goto('http://localhost:3000');
  await page.click('button');
  // Wait for navigation after the click
  await page.waitForURL('http://localhost:3000/Auth/login',{
    timeout: 2000
  });
  expect(page.url()).toMatch('http://localhost:3000/Auth/login');
});

// Login test
test('Login test', async ({ page }) => {
  await page.goto('http://localhost:3000/Auth/login');
  
  await page.waitForSelector('#emailInput');
  await page.waitForSelector('#passwordInput');
  
  await page.fill('#emailInput', testUser.email);
  await page.fill('#passwordInput', testUser.password);
  
  const emailValue = await page.inputValue('#emailInput');
  const passwordValue = await page.inputValue('#passwordInput');


  expect(emailValue).toBe(testUser.email);
  expect(passwordValue).toBe(testUser.password);
  
  await page.click('#submitInput');

  await page.waitForURL('http://localhost:3000/Auth/login',{
    timeout: 2000
  });
});

// register test
test('Register test', async ({ page }) => {
  await page.goto('http://localhost:3000/Auth/register');
  
  await page.waitForSelector('#nameInput');
  await page.waitForSelector('#emailInput');
  await page.waitForSelector('#passwordInput');
  await page.waitForSelector('#passwordConfirmationInput');
  await page.waitForSelector('#submitInput');
  
  await page.fill('#nameInput', testUser.username);
  await page.fill('#emailInput', testUser.email);
  await page.fill('#passwordInput', testUser.password);
  await page.fill('#passwordConfirmationInput', testUser.password);

  
  const emailValue = await page.inputValue('#emailInput');
  const passwordValue = await page.inputValue('#passwordInput');
  const usernameValue = await page.inputValue('#nameInput');

  expect(emailValue).toBe(testUser.email);
  expect(passwordValue).toBe(testUser.password);
  expect(usernameValue).toBe(testUser.username);
  
  await page.click('#submitInput');

  await page.waitForURL('http://localhost:3000/Auth/register',{
    timeout: 2000
  });
});