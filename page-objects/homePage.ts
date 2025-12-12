import { Page, Locator } from '@playwright/test'
import { BasePage } from './basePage'

export class HomePage extends BasePage {
  public name = 'Home Page'

  constructor(readonly page: Page, name = 'Home Page') {
    super(page)
    this.name = name
  }

  // Main locators (lazy getters)
  public get adCarousel(): Locator {
    return this.page.locator('#slider-carousel')
  }

  public get leftControlCarouselButton(): Locator {
    return this.adCarousel.locator('.left.control-carousel')
  }

  public get rightControlCarouselButton(): Locator {
    return this.adCarousel.locator('.right.control-carousel')
  }

  public get testCasesButton(): Locator {
    return this.adCarousel.getByRole('button', { name: 'Test Cases' })
  }

  public get apiTestsButton(): Locator {
    return this.adCarousel.getByRole('button', {
      name: 'APIs list for practice',
    })
  }
}
