import { test, expect } from '@playwright/test'
import { environment as ENV } from '../utils/env.ts'
import { SignUpLoginPage } from '../page-objects/signUpLoginPage.ts'
import { ApiClient, CreateAccountRequest } from '../utils/apiClient.ts'

// Custom fixture to track and cleanup test-created accounts
type TestFixtures = {
  accountToCleanup: {
    email?: string
    password?: string
  }
}

const testWithCleanup = test.extend<TestFixtures>({
  accountToCleanup: async ({ request }, use) => {
    const accountData = { email: undefined, password: undefined }
    await use(accountData)
    // Cleanup only if email AND password were set (test created an account)
    if (accountData.email && accountData.password) {
      try {
        const apiClient = new ApiClient(request)
        const deleteResponse = await apiClient.deleteAccount(
          accountData.email,
          accountData.password
        )
        console.log(`✓ Account ${accountData.email} cleaned up via API: ${deleteResponse.message}`)
      } catch (error) {
        console.error('⚠ Failed to cleanup account via API:', error)
      }
    }
  },
})

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
      // Open new Browser window (if not opened yet) and navigate to Signup/Login Page
      await page.goto('/login')
    })

    testWithCleanup(
      'Test Case 1: Register User',
      async ({ page, accountToCleanup }) => {
        const signUpLoginPage = new SignUpLoginPage(page)

        const testUserName = 'New Test User'
        const testUserEmail = `new-user-${Date.now()}@test.com`
        const testUserPassword = 'Test@123'

        // Verify Signup Form is present on SignUp/Login page
        await expect(signUpLoginPage.signUpForm).toContainText(
          'New User Signup!'
        )

        // Fill new test user name and email and click Signup button
        await signUpLoginPage.signupAs(testUserName, testUserEmail)

        await expect(signUpLoginPage.loginForm).toContainText(
          'Enter Account Information'
        )
        await signUpLoginPage.maleTitleRadioButton.check()
        await expect(signUpLoginPage.nameInput).toHaveValue(testUserName)
        await expect(signUpLoginPage.emailInput).toHaveValue(testUserEmail)
        await signUpLoginPage.passwordInput.fill(testUserPassword)
        await signUpLoginPage.daySelector.selectOption('18')
        await signUpLoginPage.monthSelector.selectOption('June')
        await signUpLoginPage.yearSelector.selectOption('1994')

        // Subscribe for newsletter and special offers
        await signUpLoginPage.signupForNewsCheckbox.check()
        await signUpLoginPage.receiveSpecialOffersCheckbox.check()

        // input Address information
        await signUpLoginPage.firstNameInput.fill('Alex')
        await signUpLoginPage.lastNameInput.fill('Tester')
        await signUpLoginPage.companyInput.fill('Self-employed')
        await signUpLoginPage.addressInput.fill(
          'Noname street, 14359, Mini Company, office 1'
        )
        await signUpLoginPage.countrySelector.selectOption('Singapore')
        await signUpLoginPage.stateInput.fill('Singapore state')
        await signUpLoginPage.cityInput.fill('Singapore city')
        await signUpLoginPage.zipcodeInput.fill('12345')
        await signUpLoginPage.mobileNumInput.fill('586 588 55')

        // Create new user by clicking 'Create Account' button
        await signUpLoginPage.createAccountButton.click()

        // Verify account successfully created
        await expect(signUpLoginPage.accountCreatedConfirmation).toContainText(
          'Account Created!'
        )

        // click 'Continue' button to return to Home page
        await signUpLoginPage.continueButton.click()

        // verify 'logged in as <created user>' is displayed on Home page
        await expect(signUpLoginPage.navBarMenu).toContainText(
          `Logged in as ${testUserName}`
        )

        // Track account for cleanup via fixture
        accountToCleanup.email = testUserEmail
        accountToCleanup.password = testUserPassword
      }
    )

    test('Test Case 5: Register User with existing email', async ({ page }) => {
      const signUpLoginPage = new SignUpLoginPage(page)

      const existingUserName = 'Alex Existing'

      // Verify Signup Form is present on SignUp/Login page
      await expect(signUpLoginPage.signUpForm).toContainText('New User Signup!')

      // Fill existing user name and email and click 'Sign Up' button
      await signUpLoginPage.signupAs(existingUserName, ENV.EXISTING_USER_EMAIL)

      // verify error message 'Email Address already exist!' appeared
      await expect(signUpLoginPage.signUpForm).toContainText(
        'Email Address already exist!'
      )
    })

    testWithCleanup(
      'Test Case 6: Delete Account via UI',
      async ({ page, request, accountToCleanup }) => {
        const signUpLoginPage = new SignUpLoginPage(page)
        const apiClient = new ApiClient(request)

        const testUserName = 'Delete Test User'
        const testUserEmail = `delete-user-${Date.now()}@test.com`
        const testUserPassword = 'Test@123'

        // Setup: Create test user via API
        const createAccountData: CreateAccountRequest = {
          name: testUserName,
          email: testUserEmail,
          password: testUserPassword,
          title: 'Mr',
          birth_date: '15',
          birth_month: '5',
          birth_year: '1990',
          firstname: 'Delete',
          lastname: 'Tester',
          company: 'QA Team',
          address1: 'Test Street 123',
          country: 'United States',
          zipcode: '12345',
          state: 'California',
          city: 'Los Angeles',
          mobile_number: '1234567890',
        }

        try {
          const createResponse = await apiClient.createAccount(
            createAccountData
          )
          console.log(`✓ Test user ${testUserEmail} created via API: ${createResponse.message}`)
        } catch (error) {
          console.error('Failed to create test user via API:', error)
          throw error
        }

        // Login with created account
        await signUpLoginPage.loginAs(testUserEmail, testUserPassword)

        // Verify user successfully logged in
        await expect(signUpLoginPage.navBarMenu).toContainText(
          `Logged in as ${testUserName}`
        )

        // Click Delete Account button
        await signUpLoginPage.deleteAccountLink.click()

        // Verify account deletion confirmation message appears
        await expect(signUpLoginPage.accountDeletedConfirmation).toContainText(
          'Account Deleted!'
        )

        // Click Continue button to return to Home page
        await signUpLoginPage.continueButton.click()

        // Verify 'logged in as ...' is not present on the Home page anymore
        await expect(signUpLoginPage.navBarMenu).not.toContainText(
          'Logged in as'
        )

        // Track account for cleanup via fixture (fallback if test fails before deletion)
        accountToCleanup.email = testUserEmail
        accountToCleanup.password = testUserPassword
      }
    )
  }
)

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
      // Navigate to Signup/Login Page
      await page.goto('/login')
    })

    test('Test Case 2: Login User with correct email and password', async ({
      page,
    }) => {
      const signUpLoginPage = new SignUpLoginPage(page)

      const existingUserName = 'Alex Existing'

      // Verify Login Form is present on SignUp/Login page
      await expect(signUpLoginPage.loginForm).toContainText(
        'Login to your account'
      )

      // Login as existing test user
      await signUpLoginPage.loginAs(
        ENV.EXISTING_USER_EMAIL,
        ENV.EXISTING_USER_PASSWORD
      )

      //verify user successfully logged in
      await expect(signUpLoginPage.navBarMenu).toContainText(
        `Logged in as ${existingUserName}`
      )
    })

    test('Test Case 3: Login User with incorrect email and password', async ({
      page,
    }) => {
      const signUpLoginPage = new SignUpLoginPage(page)

      const invalidUserEmail = 'testincorrect@abc.com'
      const invalidUserPassword = '55555555'

      // Verify Login Form is present on SignUp/Login page
      await expect(signUpLoginPage.loginForm).toContainText(
        'Login to your account'
      )

      // Try to login with invalid credentials
      await signUpLoginPage.loginAs(invalidUserEmail, invalidUserPassword)

      //verify user is NOT logged in and error message is displayed
      await expect(signUpLoginPage.navBarMenu).not.toContainText('Logged in as')
      await expect(signUpLoginPage.loginForm).toContainText(
        'Your email or password is incorrect!'
      )
    })

    test('Test Case 4: Logout User', async ({ page }) => {
      const signUpLoginPage = new SignUpLoginPage(page)

      // Verify Login Form is present on SignUp/Login page
      await expect(signUpLoginPage.loginForm).toContainText(
        'Login to your account'
      )

      // Login as a valid user
      await signUpLoginPage.loginAs(
        ENV.EXISTING_USER_EMAIL,
        ENV.EXISTING_USER_PASSWORD
      )

      // perform logout
      await signUpLoginPage.logoutLink.click()

      // verify logout is successful
      await expect(signUpLoginPage.signUpLoginPageLink).toHaveAttribute(
        'style',
        'color: orange;'
      )
      await expect(signUpLoginPage.loginForm).toContainText(
        'Login to your account'
      )
    })
  }
)
