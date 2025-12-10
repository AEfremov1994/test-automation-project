import { Page, Locator } from '@playwright/test'
import { NavigationBar } from './navigationBar'

export class HomePage {
	
	readonly page: Page
	public name = 'Home Page'

	// Main locators
	readonly $adCarousel: Locator
	readonly $leftControlCarouselButton: Locator
	readonly $rightControlCarouselButton: Locator
	readonly $testCasesButton: Locator
	readonly $apiTestsButton: Locator

	// Specific locators
	readonly $accountDeletedConfirmation: Locator
	readonly $continueButton: Locator

	navigationBar: NavigationBar

	constructor(page: Page, name = 'Home Page') {

		this.page = page
		this.name = name

		this.$adCarousel = page.locator('#slider-carousel')
		this.$leftControlCarouselButton = this.$adCarousel.locator('.left.control-carousel')
		this.$rightControlCarouselButton = this.$adCarousel.locator('.right.control-carousel')
		this.$testCasesButton = this.$adCarousel.getByRole('button', {name: 'Test Cases'})
		this.$apiTestsButton = this.$adCarousel.getByRole('button', {name: 'APIs list for practice'})

		this.$accountDeletedConfirmation = page.getByTestId('account-deleted')
		this.$continueButton = page.getByTestId('continue-button')

		this.navigationBar = new NavigationBar(page)
	}

}