import { Page, Locator } from '@playwright/test'
import { BasePage } from './basePage'

export class SignUpLoginPage extends BasePage {
  public name = 'Signup/Login Page'

  constructor(readonly page: Page, name = 'Signup/Login Page') {
    super(page)
    this.name = name
  }
  // login form locators (inline initialized fields)
  public loginForm: Locator = this.page.locator('.login-form')
  public loginEmailInput: Locator = this.page.getByTestId('login-email')
  public loginPasswordInput: Locator = this.page.getByTestId('login-password')
  public loginButton: Locator = this.page.getByTestId('login-button')

  // signup form locators
  public signUpForm: Locator = this.page.locator('.signup-form')
  public signUpNameInput: Locator = this.page.getByTestId('signup-name')
  public signUpEmailInput: Locator = this.page.getByTestId('signup-email')
  public signUpButton: Locator = this.page.getByTestId('signup-button')

  public registrationForm: Locator = this.page.locator('.login-form') // has the same locator, NOT duplicate

  // registration form locators
  public maleTitleRadioButton: Locator = this.page.getByTestId('title').nth(0)
  public femaleTitleRadioButton: Locator = this.page.getByTestId('title').nth(1)
  public nameInput: Locator = this.page.getByTestId('name')
  public emailInput: Locator = this.page.getByTestId('email')
  public passwordInput: Locator = this.page.getByTestId('password')
  public daySelector: Locator = this.page.getByTestId('days')
  public monthSelector: Locator = this.page.getByTestId('months')
  public yearSelector: Locator = this.page.getByTestId('years')
  public signupForNewsCheckbox: Locator = this.page.getByRole('checkbox', {
    name: 'newsletter',
  })
  public receiveSpecialOffersCheckbox: Locator = this.page.locator(
    'input[name="optin"]'
  )
  public firstNameInput: Locator = this.page.getByTestId('first_name')
  public lastNameInput: Locator = this.page.getByTestId('last_name')
  public companyInput: Locator = this.page.getByTestId('company')
  public addressInput: Locator = this.page.getByTestId('address')
  public countrySelector: Locator = this.page.getByTestId('country')
  public stateInput: Locator = this.page.getByTestId('state')
  public cityInput: Locator = this.page.getByTestId('city')
  public zipcodeInput: Locator = this.page.getByTestId('zipcode')
  public mobileNumInput: Locator = this.page.getByTestId('mobile_number')
  public createAccountButton: Locator = this.page.getByTestId('create-account')
  public accountCreatedConfirmation: Locator =
    this.page.getByTestId('account-created')
  public continueButton: Locator = this.page.getByTestId('continue-button')
  public accountDeletedConfirmation: Locator =
    this.page.getByTestId('account-deleted')

  // Basic login method
  async loginAs(email: string, password: string) {
    await this.loginEmailInput.fill(email)
    await this.loginPasswordInput.fill(password)
    await this.loginButton.click()
  }

  // Init signup method
  async signupAs(name: string, email: string) {
    await this.signUpNameInput.fill(name)
    await this.signUpEmailInput.fill(email)
    await this.signUpButton.click()
  }
}
