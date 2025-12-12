import { Page, Locator } from '@playwright/test'

export abstract class BasePage {
  constructor(protected readonly page: Page) {}

  // Main navigation container
  public get navBarMenu(): Locator {
    return this.page.locator('.navbar-nav')
  }

  // Navbar links (lazy, computed on access)
  public get homePageLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Home' })
  }

  public get productsPageLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Products' })
  }

  public get cartLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Cart' })
  }

  public get signUpLoginPageLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Signup / Login' })
  }

  public get testCasesPageLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Test Cases' })
  }

  public get apiTestingPageLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'API Testing' })
  }

  public get contactUsPageLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Contact us' })
  }

  public get logoutLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Logout' })
  }

  public get deleteAccountLink(): Locator {
    return this.navBarMenu.getByRole('link', { name: 'Delete Account' })
  }
}
