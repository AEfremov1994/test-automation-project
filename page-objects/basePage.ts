import { Page, Locator } from '@playwright/test'

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // Main navigation container - inline initializer using this.page
  public navBarMenu: Locator = this.page.locator('.navbar-nav')

  // Navbar links initialized inline (will be emitted as constructor assignments)
  public homePageLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Home',
  })
  public productsPageLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Products',
  })
  public cartLink: Locator = this.navBarMenu.getByRole('link', { name: 'Cart' })
  public signUpLoginPageLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Signup / Login',
  })
  public testCasesPageLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Test Cases',
  })
  public apiTestingPageLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'API Testing',
  })
  public contactUsPageLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Contact us',
  })
  public logoutLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Logout',
  })
  public deleteAccountLink: Locator = this.navBarMenu.getByRole('link', {
    name: 'Delete Account',
  })
}
