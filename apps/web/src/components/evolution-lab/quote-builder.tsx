import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'
import { usePackageQuoteMutation } from '@/hooks/use-contact-mutation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { SectionHeader } from '@/components/shared/section-header'
import { formatINR } from '@/config/labs/hardware-selection'
import { LAB_PACKAGES } from '@/config'

// Pricing constants
const TRAINING_COSTS = {
  none: 0,
  '1d': 50000,
  '3d': 150000,
  '5d': 240000,
}

const TEACHER_TRAINING_COSTS = {
  none: 0,
  no_cert: 15000,
  with_cert: 35000,
}

interface FormState {
  packageId: number
  trainingFrequency: 'none' | '1d' | '3d' | '5d'
  trainerPreference: 'male' | 'female' | 'no_preference'
  teacherTraining: 'none' | 'no_cert' | 'with_cert'
  instructorCount: number
}

interface ContactInfo {
  name: string
  email: string
  phone: string
  organization: string
}

export function QuoteBuilder() {
  const ref = useScrollFadeIn()
  const mutation = usePackageQuoteMutation()

  const [formState, setFormState] = useState<FormState>({
    packageId: 1,
    trainingFrequency: 'none',
    trainerPreference: 'no_preference',
    teacherTraining: 'none',
    instructorCount: 0,
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
    organization: '',
  })

  const [trainingFee, setTrainingFee] = useState(0)
  const [teacherFee, setTeacherFee] = useState(0)

  // Calculate fees whenever form state changes
  useEffect(() => {
    const trainingCost = TRAINING_COSTS[formState.trainingFrequency as keyof typeof TRAINING_COSTS] || 0
    const teacherTrainingCost =
      (TEACHER_TRAINING_COSTS[formState.teacherTraining as keyof typeof TEACHER_TRAINING_COSTS] || 0) *
      formState.instructorCount
    setTrainingFee(trainingCost)
    setTeacherFee(teacherTrainingCost)
  }, [formState])

  // Auto-disable and reset instructor count when teacher training is "none"
  useEffect(() => {
    if (formState.teacherTraining === 'none' && formState.instructorCount > 0) {
      setFormState((prev) => ({ ...prev, instructorCount: 0 }))
    }
  }, [formState.teacherTraining, formState.instructorCount])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const selectedPackage = LAB_PACKAGES.find((pkg) => pkg.id === formState.packageId)
    if (!selectedPackage) return

    const totalAddons = trainingFee + teacherFee

    mutation.mutate(
      {
        ...contactInfo,
        packageId: selectedPackage.id,
        packageName: selectedPackage.name,
        packageSubtitle: selectedPackage.subtitle,
        packageTheme: selectedPackage.theme,
        packagePrice: selectedPackage.price,
        setupTime: selectedPackage.setupTime,
        purpose: selectedPackage.purpose,
        ideal: selectedPackage.ideal,
        trainingPlan: formState.trainingFrequency,
        trainerGender: formState.trainerPreference,
        teacherPlan: formState.teacherTraining,
        teacherCount: formState.instructorCount.toString(),
        trainingFee,
        teacherFee,
        totalAddons,
      },
      {
        onSuccess: () => {
          // Reset form on success
          setFormState({
            packageId: 1,
            trainingFrequency: 'none',
            trainerPreference: 'no_preference',
            teacherTraining: 'none',
            instructorCount: 0,
          })
          setContactInfo({
            name: '',
            email: '',
            phone: '',
            organization: '',
          })
        },
      }
    )
  }

  const totalAddons = trainingFee + teacherFee
  const isSubmitDisabled =
    !contactInfo.name ||
    !contactInfo.email ||
    !contactInfo.phone ||
    !contactInfo.organization ||
    mutation.isPending

  return (
    <div ref={ref}>
      <SectionHeader
        title="Build Your Custom Quote"
        subtitle="Configure your training needs and get an instant quote"
      />

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
        {/* Package Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Your Lab Package</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="package">
                Lab Package <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formState.packageId.toString()}
                onValueChange={(value) =>
                  setFormState((prev) => ({ ...prev, packageId: parseInt(value) }))
                }
              >
                <SelectTrigger id="package">
                  <SelectValue placeholder="Select a package" />
                </SelectTrigger>
                <SelectContent>
                  {LAB_PACKAGES.map((pkg) => (
                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                      {pkg.name} - {pkg.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formState.packageId > 0 && (
                <p className="text-sm text-muted-foreground">
                  {LAB_PACKAGES.find((p) => p.id === formState.packageId)?.subtitle}
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Training Configuration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Training Frequency */}
              <div className="space-y-2">
                <Label htmlFor="training-frequency">Training Schedule</Label>
                <Select
                  value={formState.trainingFrequency}
                  onValueChange={(value: FormState['trainingFrequency']) =>
                    setFormState((prev) => ({ ...prev, trainingFrequency: value }))
                  }
                >
                  <SelectTrigger id="training-frequency">
                    <SelectValue placeholder="Select training schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No trainer required - {formatINR(0)}/year</SelectItem>
                    <SelectItem value="1d">
                      1 day/week (full-day) - {formatINR(TRAINING_COSTS['1d'])}/year
                    </SelectItem>
                    <SelectItem value="3d">
                      3 days/week (full-day) - {formatINR(TRAINING_COSTS['3d'])}/year
                    </SelectItem>
                    <SelectItem value="5d">
                      5 days/week (full-day) - {formatINR(TRAINING_COSTS['5d'])}/year
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trainer Preference */}
              <div className="space-y-2">
                <Label htmlFor="trainer-preference">Trainer Preference</Label>
                <Select
                  value={formState.trainerPreference}
                  onValueChange={(value: FormState['trainerPreference']) =>
                    setFormState((prev) => ({ ...prev, trainerPreference: value }))
                  }
                  disabled={formState.trainingFrequency === 'none'}
                >
                  <SelectTrigger id="trainer-preference">
                    <SelectValue placeholder="Select preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="no_preference">No Preference</SelectItem>
                    <SelectItem value="male">Male Trainer</SelectItem>
                    <SelectItem value="female">Female Trainer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Teacher Training */}
              <div className="space-y-2">
                <Label htmlFor="teacher-training">Teacher Training</Label>
                <Select
                  value={formState.teacherTraining}
                  onValueChange={(value: FormState['teacherTraining']) =>
                    setFormState((prev) => ({ ...prev, teacherTraining: value }))
                  }
                >
                  <SelectTrigger id="teacher-training">
                    <SelectValue placeholder="Select teacher training" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      No teacher training - {formatINR(0)}/instructor
                    </SelectItem>
                    <SelectItem value="no_cert">
                      Teacher Training (no IBM cert) -{' '}
                      {formatINR(TEACHER_TRAINING_COSTS.no_cert)}/instructor
                    </SelectItem>
                    <SelectItem value="with_cert">
                      Teacher Training (with IBM cert) -{' '}
                      {formatINR(TEACHER_TRAINING_COSTS.with_cert)}/instructor
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Instructor Count */}
              <div className="space-y-2">
                <Label htmlFor="instructor-count">Number of Instructors</Label>
                <Input
                  id="instructor-count"
                  type="number"
                  min="0"
                  max="10"
                  value={formState.instructorCount}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      instructorCount: Math.max(0, Math.min(10, parseInt(e.target.value) || 0)),
                    }))
                  }
                  disabled={formState.teacherTraining === 'none'}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">Range: 0-10 instructors</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization">
                  Organization <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="organization"
                  type="text"
                  value={contactInfo.organization}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, organization: e.target.value }))
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Quote Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Lab Package Cost */}
              {(() => {
                const selectedPackage = LAB_PACKAGES.find((pkg) => pkg.id === formState.packageId)
                return selectedPackage ? (
                  <div className="flex justify-between items-center bg-muted/50 p-3 rounded-lg">
                    <div className="flex flex-col">
                      <span className="font-semibold">{selectedPackage.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {selectedPackage.subtitle}
                      </span>
                    </div>
                    <span className="font-bold text-primary">{selectedPackage.price}</span>
                  </div>
                ) : null
              })()}

              {(trainingFee > 0 || teacherFee > 0) && <Separator />}

              {/* Training Cost Line Item */}
              {trainingFee > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Training Cost (per year)</span>
                  <span className="font-medium">{formatINR(trainingFee)}</span>
                </div>
              )}

              {/* Teacher Training Line Item */}
              {teacherFee > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Teacher Training ({formState.instructorCount}{' '}
                    {formState.instructorCount === 1 ? 'instructor' : 'instructors'})
                  </span>
                  <span className="font-medium">{formatINR(teacherFee)}</span>
                </div>
              )}

              {totalAddons === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Configure your training options above to see additional costs
                </p>
              )}
            </div>

            {totalAddons > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total Add-ons Cost</span>
                  <span className="text-2xl font-bold text-primary">{formatINR(totalAddons)}</span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <Button type="submit" size="lg" className="w-full" disabled={isSubmitDisabled}>
          {mutation.isPending ? 'Submitting...' : 'Request Quote'}
        </Button>

        {/* Success/Error Alerts */}
        {mutation.isSuccess && (
          <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
            <AlertDescription className="text-green-800 dark:text-green-200">
              Your quote request has been submitted successfully! We'll get back to you soon.
            </AlertDescription>
          </Alert>
        )}

        {mutation.isError && (
          <Alert className="bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800">
            <AlertDescription className="text-red-800 dark:text-red-200">
              Failed to submit your quote request. Please try again or contact us directly.
            </AlertDescription>
          </Alert>
        )}
      </form>
    </div>
  )
}
