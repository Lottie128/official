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

export interface TrainingQuoteData {
  name: string
  email: string
  phone?: string
  trainingFrequency: 'none' | '1day' | '3days' | '5days'
  trainerPreference: 'male' | 'female' | 'no-preference'
  teacherTraining: 'none' | 'no-cert' | 'with-cert'
  instructorCount: number
  totalCost: number
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

  sendTrainingQuote: async (data: TrainingQuoteData) => {
    const response = await fetch(`${API_BASE}/send-training-quote.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error('Failed to send training quote')
    }

    return response.json()
  },
}
