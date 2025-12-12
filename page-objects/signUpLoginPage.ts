import { Page, Locator } from '@playwright/test'
import { BasePage } from './basePage'

export class SignUpLoginPage extends BasePage {
  public name = 'Signup/Login Page'

  constructor(readonly page: Page, name = 'Signup/Login Page') {
    super(page)
    this.name = name
  }

  // login form locators
  public get loginForm(): Locator {
    return this.page.locator('.login-form')
  }

  public get loginEmailInput(): Locator {
    return this.page.getByTestId('login-email')
  }

  public get loginPasswordInput(): Locator {
    return this.page.getByTestId('login-password')
  }

  public get loginButton(): Locator {
    return this.page.getByTestId('login-button')
  }

  // signup form locators
  public get signUpForm(): Locator {
    return this.page.locator('.signup-form')
  }

  public get signUpNameInput(): Locator {
    return this.page.getByTestId('signup-name')
  }

  public get signUpEmailInput(): Locator {
    return this.page.getByTestId('signup-email')
  }

  public get signUpButton(): Locator {
    return this.page.getByTestId('signup-button')
  }

  public get registrationForm(): Locator {
    return this.page.locator('.login-form') // has the same locator, NOT duplicate
  }

  // registration form locators
  public get maleTitleRadioButton(): Locator {
    return this.page.getByTestId('title').nth(0)
  }

  public get femaleTitleRadioButton(): Locator {
    return this.page.getByTestId('title').nth(1)
  }

  public get nameInput(): Locator {
    return this.page.getByTestId('name')
  }

  public get emailInput(): Locator {
    return this.page.getByTestId('email')
  }

  public get passwordInput(): Locator {
    return this.page.getByTestId('password')
  }

  public get daySelector(): Locator {
    return this.page.getByTestId('days')
  }

  public get monthSelector(): Locator {
    return this.page.getByTestId('months')
  }

  public get yearSelector(): Locator {
    return this.page.getByTestId('years')
  }

  public get signupForNewsCheckbox(): Locator {
    return this.page.getByRole('checkbox', { name: 'newsletter' })
  }

  public get receiveSpecialOffersCheckbox(): Locator {
    return this.page.locator('input[name="optin"]')
  }

  public get firstNameInput(): Locator {
    return this.page.getByTestId('first_name')
  }

  public get lastNameInput(): Locator {
    return this.page.getByTestId('last_name')
  }

  public get companyInput(): Locator {
    return this.page.getByTestId('company')
  }

  public get addressInput(): Locator {
    return this.page.getByTestId('address')
  }

  public get countrySelector(): Locator {
    return this.page.getByTestId('country')
  }

  public get stateInput(): Locator {
    return this.page.getByTestId('state')
  }

  public get cityInput(): Locator {
    return this.page.getByTestId('city')
  }

  public get zipcodeInput(): Locator {
    return this.page.getByTestId('zipcode')
  }

  public get mobileNumInput(): Locator {
    return this.page.getByTestId('mobile_number')
  }

  public get createAccountButton(): Locator {
    return this.page.getByTestId('create-account')
  }

  public get accountCreatedConfirmation(): Locator {
    return this.page.getByTestId('account-created')
  }

  public get continueButton(): Locator {
    return this.page.getByTestId('continue-button')
  }

  public get accountDeletedConfirmation(): Locator {
    return this.page.getByTestId('account-deleted')
  }

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
