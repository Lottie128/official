import { useMutation } from '@tanstack/react-query'
import { contactAPI } from '@/lib/api'

export function useContactMutation() {
  return useMutation({
    mutationFn: contactAPI.sendContactForm,
  })
}

export function useHardwareQuoteMutation() {
  return useMutation({
    mutationFn: contactAPI.sendHardwareQuote,
  })
}

export function usePackageQuoteMutation() {
  return useMutation({
    mutationFn: contactAPI.sendPackageQuote,
  })
}
