import { test, expect } from '@playwright/test'
import { environment as ENV } from '../utils/env.ts'
import { HomePage } from '../page-objects/homePage.ts';
import { SignUpLoginPage } from '../page-objects/signUpLoginPage.ts';

test.describe(
  'Registration tests',
  {
    annotation: {
      type: 'Basic user registration scenarios',
      description: 'https://www.automationexercise.com/test_cases',
    },
  },
  () => {
    test.beforeEach(async ({ page }) => {
	
		// Open new Browser window (if not opened yet) and navigate to Home Page
	  	await page.goto(ENV.BASE_URL!)

    })

    test('Test Case 1: Register User', async ({ page }) => {

		const homePage = new HomePage(page) 
		const signUpLoginPage = new SignUpLoginPage(page) 

		const testUserName = 'New Test User'

      	// Navigate to Login/SignUp page
      	await homePage.navigationBar.goToSignUpLoginPage()
      	await expect(signUpLoginPage.$signUpForm).toContainText('New User Signup!')

		// Fill new test user name and email and click Signup button
		signUpLoginPage.signup(testUserName, ENV.NEW_USER_EMAIL!)

		// Input new user information
		await expect(signUpLoginPage.$loginForm).toContainText('Enter Account Information')
		await signUpLoginPage.$maleTitleRadioButton.check()
		await expect(signUpLoginPage.$nameInput).toHaveValue(testUserName)
		await expect(signUpLoginPage.$emailInput).toHaveValue(ENV.NEW_USER_EMAIL!)
		await signUpLoginPage.$passwordInput.fill(ENV.NEW_USER_PASSWORD!)
		await signUpLoginPage.$daySelector.selectOption('18')
		await signUpLoginPage.$monthSelector.selectOption('June')
		await signUpLoginPage.$yearSelector.selectOption('1994')

		// Subscribe for newsletter and special offers
		await signUpLoginPage.$signupForNewsCheckbox.check()
		await signUpLoginPage.$receiveSpecialOffersCheckbox.check()

		// input Address information
		await signUpLoginPage.$firstNameInput.fill('Alex')
		await signUpLoginPage.$lastNameInput.fill('Tester')
		await signUpLoginPage.$companyInput.fill('Self-employed')
		await signUpLoginPage.$addressInput.fill('Noname street, 14359, Mini Company, office 1')
		await signUpLoginPage.$countrySelector.selectOption('Singapore')
		await signUpLoginPage.$stateInput.fill('Singapore state')
		await signUpLoginPage.$cityInput.fill('Singapore city')
		await signUpLoginPage.$zipcodeInput.fill('12345')
		await signUpLoginPage.$mobileNumInput.fill('586 588 55')

		// Create new user by clicking 'Create Account' button
		await signUpLoginPage.$createAccountButton.click()

		// Verify account successfully created
		await expect(signUpLoginPage.$accountCreatedConfirmation).toContainText('Account Created!')

		// click 'Continue' button to return to Home page
		await signUpLoginPage.$continueButton.click()

		// verify 'logged in as <created user>' is displayed on Home page
		await expect(homePage.navigationBar.$navBarMenu).toContainText(`Logged in as ${testUserName}`)

		// Delete created account
		await homePage.navigationBar.$deleteAccountLink.click()

		// verify account successfully deleted
		await expect(homePage.$accountDeletedConfirmation).toContainText('Account Deleted!')

		// click 'Continue' button to return to Home page
		await homePage.$continueButton.click()

		// verify 'logged in as ...' is not present on the Home page anymore
		await expect(homePage.navigationBar.$navBarMenu).not.toContainText('Logged in as')
    })

    test('Test Case 5: Register User with existing email', async ({ page }) => {
      
		const homePage = new HomePage(page) 
      	const signUpLoginPage = new SignUpLoginPage(page)

		const existingUserName = 'Alex Existing'

		// Navigate to Login/SignUp page
		await homePage.navigationBar.goToSignUpLoginPage()
		await expect(signUpLoginPage.$signUpForm).toContainText('New User Signup!')

		// Fill existing user name and email and click 'Sign Up' button
		signUpLoginPage.signup(existingUserName, ENV.EXISTING_USER_EMAIL!)

		// verify error message 'Email Address already exist!' appeared
		await expect(signUpLoginPage.$signUpForm).toContainText('Email Address already exist!')
	})
})

test.describe(
  'Login and logout tests',
  {
    annotation: {
      type: 'Basic user login/logout scenarios',
      description: 'https://www.automationexercise.com/test_cases',
    },
  },
  () => {
    test.beforeEach(async ({ page }) => {
		
		// Navigate to Home Page
      	await page.goto(ENV.BASE_URL!)

    })

    test('Test Case 2: Login User with correct email and password', async ({ page }) => {

		const homePage = new HomePage(page)
		const signUpLoginPage = new SignUpLoginPage(page)
      	
		const existingUserName = 'Alex Existing'

		// Navigate to Login/SignUp page
		await homePage.navigationBar.goToSignUpLoginPage()
		await expect(signUpLoginPage.$loginForm).toContainText('Login to your account')

		// Login as existing test user
		signUpLoginPage.login(ENV.EXISTING_USER_EMAIL!, ENV.EXISTING_USER_PASSWORD!)

		//verify user successfully logged in
		await expect(homePage.navigationBar.$navBarMenu).toContainText(`Logged in as ${existingUserName}`)
    })

    test('Test Case 3: Login User with incorrect email and password', async ({ page }) => {
      
		const homePage = new HomePage(page)
		const signUpLoginPage = new SignUpLoginPage(page)

		const invalidUserEmail = 'testincorrect@abc.com'
		const invalidUserPassword = '55555555'

		// Navigate to Login/SignUp page
		await homePage.navigationBar.goToSignUpLoginPage()
		await expect(signUpLoginPage.$loginForm).toContainText('Login to your account')

		// Try to login with invalid credentials
		await signUpLoginPage.login(invalidUserEmail, invalidUserPassword)

		//verify user is NOT logged in and error message is displayed
		await expect(signUpLoginPage.navigationBar.$navBarMenu).not.toContainText('Logged in as')
		await expect(signUpLoginPage.$loginForm).toContainText('Your email or password is incorrect!')
    })

    test('Test Case 4: Logout User', async ({ page }) => {
      	
		const homePage = new HomePage(page)
		const signUpLoginPage = new SignUpLoginPage(page)
      	
		const existingUserName = 'Alex Existing'

      	// Navigate to Login/SignUp page
      	await homePage.navigationBar.goToSignUpLoginPage()
		await expect(signUpLoginPage.$loginForm).toContainText('Login to your account')


      	// Login as a valid user
		await signUpLoginPage.login(ENV.EXISTING_USER_EMAIL!, ENV.EXISTING_USER_PASSWORD!)

      	// perform logout
      	await homePage.navigationBar.$logoutLink.click()

      	// verify logout is successful
      	await expect(signUpLoginPage.navigationBar.$signUpLoginPageLink).toHaveAttribute('style', 'color: orange;')
      	await expect(signUpLoginPage.$loginForm).toContainText('Login to your account')
  	})
})
