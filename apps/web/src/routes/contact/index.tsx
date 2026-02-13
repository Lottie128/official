import { useState } from 'react'
import { Mail, Phone, MapPin, Globe } from 'lucide-react'
import { PageHeader } from '@/components/shared/page-header'
import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'
import { useContactMutation } from '@/hooks/use-contact-mutation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { COMPANY_INFO } from '@/config'

export default function ContactPage() {
  const infoRef = useScrollFadeIn()
  const formRef = useScrollFadeIn(0.2)
  const contactMutation = useContactMutation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await contactMutation.mutateAsync(formData)
    if (contactMutation.isSuccess) {
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    }
  }

  return (
    <>
      <PageHeader
        title="Get In Touch"
        subtitle="Let's discuss how we can transform your vision into reality"
      />

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Information */}
            <div ref={infoRef} className="lg:col-span-2 space-y-6">
              <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

              <div className="flex gap-4 items-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <MapPin className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Headquarters</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {COMPANY_INFO.name}
                    <br />
                    {COMPANY_INFO.locations.headquarters}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Phone</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {COMPANY_INFO.contact.phone}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <Mail className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {COMPANY_INFO.contact.email.primary}
                    <br />
                    {COMPANY_INFO.contact.email.secondary}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 border border-gray-200 dark:border-gray-700">
                <Globe className="w-6 h-6 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold mb-1">Website</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {COMPANY_INFO.contact.website}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div ref={formRef} className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 border border-gray-200 dark:border-gray-700 space-y-6">
                {contactMutation.isSuccess && (
                  <Alert className="bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-800">
                    <AlertDescription className="text-green-800 dark:text-green-200">
                      Thank you! Your message has been sent successfully. We'll get back to you soon!
                    </AlertDescription>
                  </Alert>
                )}

                {contactMutation.isError && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      Oops! Something went wrong. Please try again or email us directly at{' '}
                      {COMPANY_INFO.contact.email.primary}
                    </AlertDescription>
                  </Alert>
                )}

                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email">Your Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Your Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Your Message *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2 resize-none"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={contactMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {contactMutation.isPending ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
