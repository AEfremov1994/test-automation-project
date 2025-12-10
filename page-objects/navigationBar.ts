import { Page, Locator } from '@playwright/test'

export class NavigationBar {

	readonly $navBarMenu: Locator
	readonly $homePageLink: Locator
	readonly $productsPageLink: Locator
	readonly $cartLink: Locator
	readonly $signUpLoginPageLink: Locator
	readonly $testCasesPageLink: Locator
	readonly $apiTestingPageLink: Locator
	readonly $contactUsPageLink: Locator
	readonly $logoutLink: Locator
	readonly $deleteAccountLink: Locator


	constructor(page: Page) {

		this.$navBarMenu = page.locator('.navbar-nav')
		this.$homePageLink = this.$navBarMenu.getByRole('link', { name: 'Home' })
		this.$productsPageLink = this.$navBarMenu.getByRole('link', { name: 'Products' })
		this.$cartLink = this.$navBarMenu.getByRole('link', { name: 'Cart' })
		this.$signUpLoginPageLink = this.$navBarMenu.getByRole('link', { name: 'Signup / Login' })
		this.$testCasesPageLink = this.$navBarMenu.getByRole('link', { name: 'Test Cases' })
		this.$apiTestingPageLink = this.$navBarMenu.getByRole('link', { name: 'API Testing' })
		this.$contactUsPageLink = this.$navBarMenu.getByRole('link', { name: 'Contact us' })
		this.$logoutLink = this.$navBarMenu.getByRole('link', { name: 'Logout' })
		this.$deleteAccountLink = this.$navBarMenu.getByRole('link', { name: 'Delete Account' })

	}


	//Navigate to the required page from Navigation bar
	async goToHomePage() {
		await this.$homePageLink.click()
	}

	async goToProductsPage() {
		await this.$productsPageLink.click()
	}

	async goToCart() {
		await this.$cartLink.click()
	}

	async goToSignUpLoginPage() {
		await this.$signUpLoginPageLink.click()
	}

	async goToTestCasesPage() {
		await this.$testCasesPageLink.click()
	}

	async goToApiTestingPage() {
		await this.$apiTestingPageLink.click()
	}

	async goToContactUsPage() {
		await this.$contactUsPageLink.click()
	}

}