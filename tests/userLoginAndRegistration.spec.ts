import { test, expect } from "@playwright/test";

test.describe('Registration tests', {
  annotation: {
    type: 'Basic user registration scenarios',
    description: 'https://www.automationexercise.com/test_cases',
  },
}, () => {
	
	test.beforeEach(async({page}) => {

		// Navigate to Home Page
		await page.goto("http://automationexercise.com");
		await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('style', 'color: orange;');

	});
	
	test('Test Case 1: Register User', async({page}) => {

		const navigationBarMenu = page.locator('.navbar-nav');
		const signUpForm = page.locator('.signup-form');
		const registrationForm = page.locator('.login-form');
		
		// Navigate to Login/SignUp page
		await page.getByRole('link', { name: 'Signup / Login' }).click();
		await expect(signUpForm).toContainText('New User Signup!');

		// Fill new test user name and email
		await signUpForm.getByRole('textbox', {name: 'name'}).fill('NewTestUser');
		await signUpForm.getByRole('textbox', { name: 'email' }).fill('testuser321@test.com');

		// click 'Sign Up' button
		await signUpForm.getByRole('button').click();

		// Input new user information
		await expect(registrationForm).toContainText('Enter Account Information');
		await registrationForm.locator('[data-qa="title"]').nth(0).check();
		await expect(registrationForm.locator('[data-qa="name"]')).toHaveValue('NewTestUser');
		await expect(registrationForm.getByRole('textbox', {name: 'email'})).toHaveValue('testuser321@test.com');
		await registrationForm.getByRole('textbox', {name: 'password'}).fill('testPassword321');
		await registrationForm.locator('select[name="days"]').selectOption('18');
		await registrationForm.locator('select[name="months"]').selectOption('June');
		await registrationForm.locator('select[name="years"]').selectOption('1994');

		// Subscribe for newsletter and special offers
		await registrationForm.getByRole('checkbox', {name: 'newsletter'}).check();
		await registrationForm.locator('input[name="optin"]').check();

		// input Address information
		await registrationForm.locator('[data-qa="first_name"]').fill('Alex');
		await registrationForm.locator('[data-qa="last_name"]').fill('Tester');
		await registrationForm.locator('[data-qa="company"]').fill('Self-employed');
		await registrationForm.locator('[data-qa="address"]').fill('Noname street, 14359, Mini Company, office 1');
		await registrationForm.locator('select[name="country"]').selectOption('Singapore');
		await registrationForm.locator('[data-qa="state"]').fill('Singapore state');
		await registrationForm.locator('[data-qa="city"]').fill('Singapore city');
		await registrationForm.locator('[data-qa="zipcode"]').fill('12345');
		await registrationForm.locator('[data-qa="mobile_number"]').fill('586 588 55');

		// Create new user by clicking 'Create Account' button
		await registrationForm.getByRole('button').click();

		// Verify account successfully created
		await expect(page.locator('[data-qa="account-created"]')).toContainText('Account Created!');

		// click 'Continue' button to return to Home page
		await page.locator('[data-qa="continue-button"]').click();

		// verify 'logged in as <created user>' is displayed on Home page
		await expect(navigationBarMenu).toContainText('Logged in as NewTestUser');

		// Delete created account
		await navigationBarMenu.getByRole('link', {name: 'Delete Account'}).click();

		// verify account successfully deleted
		await expect(page.locator('[data-qa="account-deleted"]')).toContainText('Account Deleted!');

		// click 'Continue' button to return to Home page
		await page.locator('[data-qa="continue-button"]').click();

		// verify 'logged in as ...' is not present on the Home page anymore
		await expect(navigationBarMenu).not.toContainText('Logged in as NewTestUser');

	});

  	test('Test Case 5: Register User with existing email', async ({page}) => {

		const existingUserName = 'Alex Existing';
		const existingUserEmail = 'testexisting@abc.com';

		const signUpForm = page.locator('.signup-form');

		// Navigate to Login/SignUp page
		await page.getByRole('link', { name: 'Signup / Login' }).click();
		await expect(signUpForm).toContainText('New User Signup!');

		// Fill existing user name and email
		await signUpForm.getByRole('textbox', {name: 'name'}).fill(existingUserName);
		await signUpForm.getByRole('textbox', { name: 'email' }).fill(existingUserEmail);

		// click 'Sign Up' button
		await signUpForm.getByRole('button').click();

		// verify error message 'Email Address already exist!' appeared
		await expect(signUpForm).toContainText('Email Address already exist!');
  });

});

test.describe('Login and logout tests', {
  annotation: {
	type: 'Basic user login/logout scenarios',
	description: 'https://www.automationexercise.com/test_cases',
  },
}, () => {
	
	test.beforeEach(async({page}) => {

		// Navigate to Home Page
		await page.goto("http://automationexercise.com");
		await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('style', 'color: orange;');

	});

	test('Test Case 2: Login User with correct email and password', async ({page}) => {

		const navigationBarMenu = page.locator('.navbar-nav');
		const loginForm = page.locator('.login-form');
		const existingUserName = 'Alex Existing';
		const existingUserEmail = 'testexisting@abc.com';
		const existingUserPassword = '12345678';

		// Navigate to Login/SignUp page
		await navigationBarMenu.getByRole('link', { name: 'Signup / Login' }).click();
		await expect(loginForm).toContainText('Login to your account');

		// Fill valid test user email and password
		await loginForm.getByRole('textbox', { name: 'email' }).fill(existingUserEmail);
		await loginForm.getByRole('textbox', {name: 'password'}).fill(existingUserPassword);

		// click 'Login' button
		await loginForm.getByRole('button').click();

		//verify user successfully logged in
		await expect(navigationBarMenu).toContainText(`Logged in as ${existingUserName}`);

		// // Delete created account
		// await navigationBarMenu.getByRole('link', {name: 'Delete Account'}).click();

		// // verify account successfully deleted
		// await expect(page.locator('[data-qa="account-deleted"]')).toContainText('Account Deleted!');

	});

	test('Test Case 3: Login User with incorrect email and password', async({page}) => {

		const navigationBarMenu = page.locator('.navbar-nav');
		const loginForm = page.locator('.login-form');
		const incorrectUserEmail = 'testincorrect@abc.com';
		const incorrectUserPassword = '55555555';

		// Navigate to Login/SignUp page
		await navigationBarMenu.getByRole('link', { name: 'Signup / Login' }).click();
		await expect(loginForm).toContainText('Login to your account');

		// Fill valid test user email and password
		await loginForm.getByRole('textbox', { name: 'email' }).fill(incorrectUserEmail);
		await loginForm.getByRole('textbox', {name: 'password'}).fill(incorrectUserPassword);

		// click 'Login' button
		await loginForm.getByRole('button').click();

		//verify user login is not performed and error message is displayed
		await expect(navigationBarMenu).not.toContainText('Logged in as');
		await expect(loginForm).toContainText('Your email or password is incorrect!');

	});

	test('Test Case 4: Logout User', async({page}) => {

		const navigationBarMenu = page.locator('.navbar-nav');
		const loginForm = page.locator('.login-form');
		const existingUserName = 'Alex Existing';
		const existingUserEmail = 'testexisting@abc.com';
		const existingUserPassword = '12345678';

		// Navigate to Login/SignUp page
		await navigationBarMenu.getByRole('link', { name: 'Signup / Login' }).click();
		await expect(loginForm).toContainText('Login to your account');

		// Fill valid test user email and password
		await loginForm.getByRole('textbox', { name: 'email' }).fill(existingUserEmail);
		await loginForm.getByRole('textbox', {name: 'password'}).fill(existingUserPassword);

		// click 'Login' button
		await loginForm.getByRole('button').click();

		//verify user successfully logged in
		await expect(navigationBarMenu).toContainText(`Logged in as ${existingUserName}`);

		// perform logout
		await navigationBarMenu.getByRole('link', { name: 'Logout' }).click();

		// verify logout is successful
		await expect(navigationBarMenu.getByRole('link', { name: 'Signup / Login' })).toHaveAttribute('style', 'color: orange;');
		await expect(loginForm).toContainText('Login to your account');
		
	});

});