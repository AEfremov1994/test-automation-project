import { APIRequestContext } from '@playwright/test'

const API_BASE_URL = 'https://automationexercise.com/api'

export interface CreateAccountRequest {
  name: string
  email: string
  password: string
  title?: string
  birth_date?: string
  birth_month?: string
  birth_year?: string
  firstname: string
  lastname: string
  company?: string
  address1: string
  address2?: string
  country: string
  zipcode: string
  state: string
  city: string
  mobile_number: string
}

export interface DeleteAccountRequest {
  email: string
  password: string
}

export interface ApiResponse {
  responseCode: number
  message: string
}

/**
 * API Client for automationexercise.com
 * Provides methods for account creation and deletion via API
 */
export class ApiClient {
  constructor(private apiRequest: APIRequestContext) {}

  /**
   * Convert object to form-urlencoded string
   */
  private objectToFormData(obj: Record<string, string>): string {
    return Object.entries(obj)
      .map(
        ([key, value]) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
      )
      .join('&')
  }

  /**
   * Create a new user account via API
   * @param userData - User account data
   * @returns API response
   */
  async createAccount(userData: CreateAccountRequest): Promise<ApiResponse> {
    try {
      const formData = this.objectToFormData(
        userData as unknown as Record<string, string>
      )

      const response = await this.apiRequest.post(
        `${API_BASE_URL}/createAccount`,
        {
          data: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (!response.ok()) {
        throw new Error(
          `Create account failed with status ${response.status()}`
        )
      }

      const responseData = await response.json()
      return responseData as ApiResponse
    } catch (error) {
      console.error('Error creating account via API:', error)
      throw error
    }
  }

  /**
   * Delete a user account via API
   * @param email - User email
   * @param password - User password
   * @returns API response
   */
  async deleteAccount(email: string, password: string): Promise<ApiResponse> {
    try {
      const formData = this.objectToFormData({
        email,
        password,
      })

      const response = await this.apiRequest.delete(
        `${API_BASE_URL}/deleteAccount`,
        {
          data: formData,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )

      if (!response.ok()) {
        throw new Error(
          `Delete account failed with status ${response.status()}`
        )
      }

      const responseData = await response.json()
      return responseData as ApiResponse
    } catch (error) {
      console.error('Error deleting account via API:', error)
      throw error
    }
  }
}

/**
 * Helper function to build form-encoded data from object
 * @param data - Object to encode
 * @returns Form-encoded string
 */
export function buildFormData(
  data: Record<string, string | number | boolean>
): string {
  return Object.entries(data)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&')
}
