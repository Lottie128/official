import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'
import { useScrollFadeIn } from '@/hooks/use-scroll-fade-in'
import { useTrainingQuoteMutation } from '@/hooks/use-contact-mutation'
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

// Pricing constants
const TRAINING_COSTS = {
  none: 0,
  '1day': 50000,
  '3days': 150000,
  '5days': 240000,
}

const TEACHER_TRAINING_COSTS = {
  none: 0,
  'no-cert': 15000,
  'with-cert': 35000,
}

interface FormState {
  trainingFrequency: 'none' | '1day' | '3days' | '5days'
  trainerPreference: 'male' | 'female' | 'no-preference'
  teacherTraining: 'none' | 'no-cert' | 'with-cert'
  instructorCount: number
}

interface ContactInfo {
  name: string
  email: string
  phone: string
}

export function QuoteBuilder() {
  const ref = useScrollFadeIn()
  const mutation = useTrainingQuoteMutation()

  const [formState, setFormState] = useState<FormState>({
    trainingFrequency: 'none',
    trainerPreference: 'no-preference',
    teacherTraining: 'none',
    instructorCount: 0,
  })

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: '',
    email: '',
    phone: '',
  })

  const [totalCost, setTotalCost] = useState(0)

  // Calculate total cost whenever form state changes
  useEffect(() => {
    const trainingCost = TRAINING_COSTS[formState.trainingFrequency]
    const teacherTrainingCost =
      TEACHER_TRAINING_COSTS[formState.teacherTraining] * formState.instructorCount
    setTotalCost(trainingCost + teacherTrainingCost)
  }, [formState])

  // Auto-disable and reset instructor count when teacher training is "none"
  useEffect(() => {
    if (formState.teacherTraining === 'none' && formState.instructorCount > 0) {
      setFormState((prev) => ({ ...prev, instructorCount: 0 }))
    }
  }, [formState.teacherTraining, formState.instructorCount])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    mutation.mutate(
      {
        ...contactInfo,
        ...formState,
        totalCost,
      },
      {
        onSuccess: () => {
          // Reset form on success
          setFormState({
            trainingFrequency: 'none',
            trainerPreference: 'no-preference',
            teacherTraining: 'none',
            instructorCount: 0,
          })
          setContactInfo({
            name: '',
            email: '',
            phone: '',
          })
        },
      }
    )
  }

  const isSubmitDisabled =
    totalCost === 0 || !contactInfo.name || !contactInfo.email || mutation.isPending

  return (
    <div ref={ref}>
      <SectionHeader
        title="Build Your Custom Quote"
        subtitle="Configure your training needs and get an instant quote"
      />

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8">
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
                    <SelectItem value="1day">
                      1 day/week (full-day) - {formatINR(TRAINING_COSTS['1day'])}/year
                    </SelectItem>
                    <SelectItem value="3days">
                      3 days/week (full-day) - {formatINR(TRAINING_COSTS['3days'])}/year
                    </SelectItem>
                    <SelectItem value="5days">
                      5 days/week (full-day) - {formatINR(TRAINING_COSTS['5days'])}/year
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
                    <SelectItem value="no-preference">No Preference</SelectItem>
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
                    <SelectItem value="no-cert">
                      Teacher Training (no IBM cert) -{' '}
                      {formatINR(TEACHER_TRAINING_COSTS['no-cert'])}/instructor
                    </SelectItem>
                    <SelectItem value="with-cert">
                      Teacher Training (with IBM cert) -{' '}
                      {formatINR(TEACHER_TRAINING_COSTS['with-cert'])}/instructor
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

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="phone">Phone (Optional)</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((prev) => ({ ...prev, phone: e.target.value }))
                  }
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
              {/* Training Cost Line Item */}
              {formState.trainingFrequency !== 'none' && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Training Cost (per year)</span>
                  <span className="font-medium">
                    {formatINR(TRAINING_COSTS[formState.trainingFrequency])}
                  </span>
                </div>
              )}

              {/* Teacher Training Line Item */}
              {formState.teacherTraining !== 'none' && formState.instructorCount > 0 && (
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Teacher Training ({formState.instructorCount}{' '}
                    {formState.instructorCount === 1 ? 'instructor' : 'instructors'})
                  </span>
                  <span className="font-medium">
                    {formatINR(
                      TEACHER_TRAINING_COSTS[formState.teacherTraining] *
                        formState.instructorCount
                    )}
                  </span>
                </div>
              )}

              {totalCost === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Configure your training options above to see the quote
                </p>
              )}
            </div>

            {totalCost > 0 && (
              <>
                <Separator />
                <div className="flex justify-between items-center pt-2">
                  <span className="text-lg font-semibold">Total Cost</span>
                  <span className="text-2xl font-bold text-primary">{formatINR(totalCost)}</span>
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
