const API_BASE = 'https://api.zeroaitech.tech'

interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

interface HardwareQuoteData {
  name: string
  email: string
  phone?: string
  tier: string
  selectedItems: string[]
  totalBudget: number
  message?: string
}

export interface PackageQuoteData {
  name: string
  email: string
  phone: string
  organization: string
  packageId: number
  packageName: string
  packageSubtitle: string
  packageTheme: string
  packagePrice: string
  setupTime: string
  purpose: string
  ideal: string
  trainingPlan: string
  trainerGender: string
  teacherPlan: string
  teacherCount: string
  trainingFee: number
  teacherFee: number
  totalAddons: number
}

export const contactAPI = {
  sendContactForm: async (data: ContactFormData) => {
    const response = await fetch(`${API_BASE}/contact/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to send contact form')
    }

    return response.json()
  },

  sendHardwareQuote: async (data: HardwareQuoteData) => {
    const response = await fetch(`${API_BASE}/send-hardware-quote.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to send hardware quote')
    }

    return response.json()
  },

  sendPackageQuote: async (data: PackageQuoteData) => {
    const response = await fetch(`${API_BASE}/send-package-email.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to send package quote')
    }

    return response.json()
  },
}
