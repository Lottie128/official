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
}
