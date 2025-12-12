import { Page, Locator } from '@playwright/test'
import { BasePage } from './basePage'

export class HomePage extends BasePage {
  public name = 'Home Page'

  constructor(readonly page: Page, name = 'Home Page') {
    super(page)
    this.name = name
  }
  // Main locators (inline field initializers)
  public adCarousel: Locator = this.page.locator('#slider-carousel')
  public leftControlCarouselButton: Locator = this.adCarousel.locator(
    '.left.control-carousel'
  )
  public rightControlCarouselButton: Locator = this.adCarousel.locator(
    '.right.control-carousel'
  )
  public testCasesButton: Locator = this.adCarousel.getByRole('button', {
    name: 'Test Cases',
  })
  public apiTestsButton: Locator = this.adCarousel.getByRole('button', {
    name: 'APIs list for practice',
  })
}
