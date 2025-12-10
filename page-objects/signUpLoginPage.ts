import { Page, Locator } from '@playwright/test'
import { NavigationBar } from './navigationBar'

export class SignUpLoginPage {
	
	readonly page: Page
	public name = 'Signup/Login Page'

	// login form locators
	readonly $loginForm: Locator
	readonly $loginEmailInput: Locator
	readonly $loginPasswordInput: Locator
	readonly $loginButton: Locator

	// signup form locators
	readonly $signUpForm: Locator
	readonly $signUpNameInput: Locator
	readonly $signUpEmailInput: Locator
	readonly $signUpButton: Locator
	readonly $registrationForm: Locator

	// registration form locators
	readonly $maleTitleRadioButton: Locator
	readonly $femaleTitleRadioButton: Locator
	readonly $nameInput: Locator
	readonly $emailInput: Locator
	readonly $passwordInput: Locator
	readonly $daySelector: Locator
	readonly $monthSelector: Locator
	readonly $yearSelector: Locator
	readonly $signupForNewsCheckbox: Locator
	readonly $receiveSpecialOffersCheckbox: Locator
	readonly $firstNameInput: Locator
	readonly $lastNameInput: Locator
	readonly $companyInput: Locator
	readonly $addressInput: Locator
	readonly $countrySelector: Locator
	readonly $stateInput: Locator
	readonly $cityInput: Locator
	readonly $zipcodeInput: Locator
	readonly $mobileNumInput: Locator
	readonly $createAccountButton: Locator
	readonly $accountCreatedConfirmation: Locator
	readonly $continueButton: Locator


	navigationBar: NavigationBar

	constructor(page: Page, name = 'Signup/Login Page') {

		this.page = page
		this.name = name

		this.$loginForm = page.locator('.login-form')
		this.$loginEmailInput = page.getByTestId('login-email')
		this.$loginPasswordInput = page.getByTestId('login-password')
		this.$loginButton = page.getByTestId('login-button')

		this.$signUpForm = page.locator('.signup-form')
		this.$signUpNameInput = page.getByTestId('signup-name')
		this.$signUpEmailInput = page.getByTestId('signup-email')
		this.$signUpButton = page.getByTestId('signup-button')

		this.$registrationForm = page.locator('.login-form') // has the same locator, NOT duplicate
		this.$maleTitleRadioButton = page.getByTestId('title').nth(0)
		this.$femaleTitleRadioButton = page.getByTestId('title').nth(1)
		this.$nameInput = page.getByTestId('name')
		this.$emailInput = page.getByTestId('email')
		this.$passwordInput = page.getByTestId('password')
		this.$daySelector = page.getByTestId('days')
		this.$monthSelector = page.getByTestId('months')
		this.$yearSelector = page.getByTestId('years')
		this.$signupForNewsCheckbox = page.getByRole('checkbox', { name: 'newsletter' })
		this.$receiveSpecialOffersCheckbox = page.locator('input[name="optin"]')
		this.$firstNameInput = page.getByTestId('first_name')
		this.$lastNameInput = page.getByTestId('last_name')
		this.$companyInput = page.getByTestId('company')
		this.$addressInput = page.getByTestId('address')
		this.$countrySelector = page.getByTestId('country')
		this.$stateInput = page.getByTestId('state')
		this.$cityInput = page.getByTestId('city')
		this.$zipcodeInput = page.getByTestId('zipcode')
		this.$mobileNumInput = page.getByTestId('mobile_number')
		this.$createAccountButton = page.getByTestId('create-account')
		this.$accountCreatedConfirmation = page.getByTestId('account-created')
		this.$continueButton = page.getByTestId('continue-button')

		this.navigationBar = new NavigationBar(page)
	}

	// Basic login method
	async login(email: string, password: string) {

		await this.$loginEmailInput.fill(email)
		await this.$loginPasswordInput.fill(password)
		await this.$loginButton.click()

	}

	// Init signup method
	async signup(name: string, email: string) {

		await this.$signUpNameInput.fill(name)
		await this.$signUpEmailInput.fill(email)
		await this.$signUpButton.click()

	}

}
