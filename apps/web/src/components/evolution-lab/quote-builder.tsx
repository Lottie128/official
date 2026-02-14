import { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useScrollFadeIn } from "@/hooks/use-scroll-fade-in";
import { usePackageQuoteMutation } from "@/hooks/use-contact-mutation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeader } from "@/components/shared/section-header";
import { formatINR } from "@/config/labs/hardware-selection";
import { LAB_PACKAGES } from "@/config";
import {
  step1Schema,
  step2Schema,
  step3Schema,
  type QuoteRequestFormData,
} from "@/schemas/quote-request";
import { cn } from "@/lib/utils";

// Re-export base schema shapes for field validation
const fieldSchemas = {
  packageId: step1Schema.shape.packageId,
  trainingFrequency: step2Schema.shape.trainingFrequency,
  trainerPreference: step2Schema.shape.trainerPreference,
  teacherTraining: step2Schema.shape.teacherTraining,
  instructorCount: step2Schema.shape.instructorCount,
  name: step3Schema.shape.name,
  email: step3Schema.shape.email,
  phone: step3Schema.shape.phone,
  organization: step3Schema.shape.organization,
};

// Pricing constants
const TRAINING_COSTS = {
  none: 0,
  "1d": 50000,
  "3d": 150000,
  "5d": 240000,
};

const TEACHER_TRAINING_COSTS = {
  none: 0,
  no_cert: 15000,
  with_cert: 35000,
};

interface QuoteBuilderProps {
  onSuccess?: () => void;
  hideHeader?: boolean;
}

export function QuoteBuilder({
  onSuccess,
  hideHeader = false,
}: QuoteBuilderProps = {}) {
  const ref = useScrollFadeIn();
  const mutation = usePackageQuoteMutation();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  const form = useForm({
    defaultValues: {
      packageId: 1,
      trainingFrequency: "none" as QuoteRequestFormData["trainingFrequency"],
      trainerPreference:
        "no_preference" as QuoteRequestFormData["trainerPreference"],
      teacherTraining: "none" as QuoteRequestFormData["teacherTraining"],
      instructorCount: 0,
      name: "",
      email: "",
      phone: "",
      organization: "",
    },
    onSubmit: async ({ value }) => {
      const selectedPackage = LAB_PACKAGES.find(
        (pkg) => pkg.id === value.packageId,
      );
      if (!selectedPackage) return;

      const trainingFee = TRAINING_COSTS[value.trainingFrequency] || 0;
      const teacherFee =
        (TEACHER_TRAINING_COSTS[value.teacherTraining] || 0) *
        value.instructorCount;
      const totalAddons = trainingFee + teacherFee;

      mutation.mutate(
        {
          name: value.name,
          email: value.email,
          phone: value.phone,
          organization: value.organization,
          packageId: selectedPackage.id,
          packageName: selectedPackage.name,
          packageSubtitle: selectedPackage.subtitle,
          packageTheme: selectedPackage.theme,
          packagePrice: selectedPackage.price,
          setupTime: selectedPackage.setupTime,
          purpose: selectedPackage.purpose,
          ideal: selectedPackage.ideal,
          trainingPlan: value.trainingFrequency,
          trainerGender: value.trainerPreference,
          teacherPlan: value.teacherTraining,
          teacherCount: value.instructorCount.toString(),
          trainingFee,
          teacherFee,
          totalAddons,
        },
        {
          onSuccess: () => {
            toast.success("Quote request submitted successfully!", {
              description: "We'll get back to you soon.",
            });
            form.reset();
            setCurrentStep(1);
            onSuccess?.();
          },
          onError: () => {
            toast.error("Failed to submit quote request", {
              description: "Please try again or contact us directly.",
            });
          },
        },
      );
    },
  });

  // Watch form values for conditional logic and pricing
  const [formValues, setFormValues] = useState(form.state.values);

  useEffect(() => {
    const unsubscribe = form.store.subscribe(() => {
      setFormValues(form.state.values);
    });
    return unsubscribe;
  }, [form]);

  const trainingFrequency = formValues.trainingFrequency;
  const teacherTraining = formValues.teacherTraining;
  const instructorCount = formValues.instructorCount;
  const packageId = formValues.packageId;

  // Auto-reset trainerPreference when training becomes "none"
  useEffect(() => {
    if (trainingFrequency === "none") {
      form.setFieldValue("trainerPreference", "no_preference");
    }
  }, [trainingFrequency, form]);

  // Auto-reset instructorCount when teacher training becomes "none"
  useEffect(() => {
    if (teacherTraining === "none" && instructorCount > 0) {
      form.setFieldValue("instructorCount", 0);
    }
  }, [teacherTraining, instructorCount, form]);

  // Calculate pricing
  const trainingFee =
    TRAINING_COSTS[trainingFrequency as keyof typeof TRAINING_COSTS] || 0;
  const teacherFee =
    (TEACHER_TRAINING_COSTS[
      teacherTraining as keyof typeof TEACHER_TRAINING_COSTS
    ] || 0) * instructorCount;
  const totalAddons = trainingFee + teacherFee;

  // Step validation
  const validateStep = async (step: 1 | 2 | 3 | 4) => {
    const values = form.state.values;

    try {
      if (step === 1) {
        step1Schema.parse(values);
        return true;
      } else if (step === 2) {
        step2Schema.parse(values);
        // Additional cross-field validation for step 2
        if (values.trainingFrequency !== "none" && !values.trainerPreference) {
          return false;
        }
        if (values.teacherTraining !== "none" && values.instructorCount === 0) {
          return false;
        }
        return true;
      } else if (step === 3) {
        step3Schema.parse(values);
        return true;
      }
      return true;
    } catch {
      return false;
    }
  };

  const [isStep1Valid, setIsStep1Valid] = useState(true);
  const [isStep2Valid, setIsStep2Valid] = useState(false);
  const [isStep3Valid, setIsStep3Valid] = useState(false);

  // Revalidate current step when values change
  useEffect(() => {
    const validate = async () => {
      if (currentStep === 1) {
        const valid = await validateStep(1);
        setIsStep1Valid(valid);
      } else if (currentStep === 2) {
        const valid = await validateStep(2);
        setIsStep2Valid(valid);
      } else if (currentStep === 3) {
        const valid = await validateStep(3);
        setIsStep3Valid(valid);
      }
    };
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentStep,
    packageId,
    trainingFrequency,
    teacherTraining,
    instructorCount,
    formValues.name,
    formValues.email,
    formValues.phone,
    formValues.organization,
  ]);

  const handleNext = async () => {
    const valid = await validateStep(currentStep);
    if (valid) {
      setCurrentStep((prev) => Math.min(4, prev + 1) as 1 | 2 | 3 | 4);
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1) as 1 | 2 | 3 | 4);
  };

  const selectedPackage = LAB_PACKAGES.find((pkg) => pkg.id === packageId);

  return (
    <div ref={ref} className="w-full">
      {!hideHeader && (
        <SectionHeader
          title="Build Your Custom Quote"
          subtitle="Configure your training needs and get an instant quote"
        />
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className={hideHeader ? "space-y-4" : "max-w-6xl mx-auto space-y-8"}
      >
        {/* Step Header */}
        <div className="text-center mb-4">
          <p className="text-sm font-medium text-muted-foreground">
            Step {currentStep} of 4
          </p>
        </div>

        {/* Step 1: Package Selection */}
        {currentStep === 1 && (
          <Card
            className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}
          >
            <CardHeader className={hideHeader ? "pb-3" : ""}>
              <CardTitle className={hideHeader ? "text-lg" : ""}>
                Select Your Lab Package
              </CardTitle>
            </CardHeader>
            <CardContent className={hideHeader ? "space-y-4" : "space-y-6"}>
              <form.Field
                name="packageId"
                validators={{
                  onChange: ({ value }) => {
                    const result = fieldSchemas.packageId.safeParse(value);
                    return result.success
                      ? undefined
                      : result.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="package">
                      Lab Package <span className="text-destructive">*</span>
                    </Label>
                    <Select
                      value={field.state.value.toString()}
                      onValueChange={(value) => {
                        field.handleChange(parseInt(value));
                      }}
                    >
                      <SelectTrigger id="package" className="h-auto py-3">
                        <SelectValue placeholder="Select a package" />
                      </SelectTrigger>
                      <SelectContent>
                        {LAB_PACKAGES.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={pkg.id.toString()}
                            className="py-3"
                          >
                            <div className="flex items-center gap-2">
                              <div className="font-semibold">{pkg.name}</div>
                              <div className="text-xs text-muted-foreground">
                                {pkg.price}
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {field.state.meta.isTouched &&
                      field.state.meta.errors.length > 0 && (
                        <p className="text-sm text-destructive">
                          {field.state.meta.errors.join(", ")}
                        </p>
                      )}
                    {selectedPackage && (
                      <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                        <p className="text-sm text-muted-foreground">
                          {selectedPackage.subtitle}
                        </p>
                        <p className="text-xs text-muted-foreground/70 mt-1">
                          ⏱️ Setup: {selectedPackage.setupTime}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Training Configuration */}
        {currentStep === 2 && (
          <Card
            className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}
          >
            <CardHeader className={hideHeader ? "pb-3" : ""}>
              <CardTitle className={hideHeader ? "text-lg" : ""}>
                Training Configuration
              </CardTitle>
            </CardHeader>
            <CardContent
              className={cn(
                "@container",
                hideHeader ? "space-y-4" : "space-y-6",
              )}
            >
              <div className="grid gap-6 grid-cols-1 @md:grid-cols-2">
                {/* Training Frequency */}
                <form.Field
                  name="trainingFrequency"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        fieldSchemas.trainingFrequency.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="training-frequency">
                        Training Schedule
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(value as typeof field.state.value);
                        }}
                      >
                        <SelectTrigger id="training-frequency">
                          <SelectValue placeholder="Select training schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            No trainer required - {formatINR(0)}/year
                          </SelectItem>
                          <SelectItem value="1d">
                            1 day/week (full-day) -{" "}
                            {formatINR(TRAINING_COSTS["1d"])}/year
                          </SelectItem>
                          <SelectItem value="3d">
                            3 days/week (full-day) -{" "}
                            {formatINR(TRAINING_COSTS["3d"])}/year
                          </SelectItem>
                          <SelectItem value="5d">
                            5 days/week (full-day) -{" "}
                            {formatINR(TRAINING_COSTS["5d"])}/year
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                {/* Trainer Preference */}
                <form.Field
                  name="trainerPreference"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        fieldSchemas.trainerPreference.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="trainer-preference">
                        Trainer Preference
                      </Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(value as typeof field.state.value);
                        }}
                        disabled={trainingFrequency === "none"}
                      >
                        <SelectTrigger id="trainer-preference">
                          <SelectValue placeholder="Select preference" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="no_preference">
                            No Preference
                          </SelectItem>
                          <SelectItem value="male">Male Trainer</SelectItem>
                          <SelectItem value="female">Female Trainer</SelectItem>
                        </SelectContent>
                      </Select>
                      {trainingFrequency === "none" && (
                        <p className="text-xs text-muted-foreground">
                          Select a training schedule to choose a trainer
                          preference.
                        </p>
                      )}
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                {/* Teacher Training */}
                <form.Field
                  name="teacherTraining"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        fieldSchemas.teacherTraining.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="teacher-training">Teacher Training</Label>
                      <Select
                        value={field.state.value}
                        onValueChange={(value) => {
                          field.handleChange(value as typeof field.state.value);
                        }}
                      >
                        <SelectTrigger id="teacher-training" className="w-full">
                          <SelectValue placeholder="Select teacher training" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">
                            No teacher training - {formatINR(0)}/instructor
                          </SelectItem>
                          <SelectItem value="no_cert">
                            Teacher Training (no IBM cert) -{" "}
                            {formatINR(TEACHER_TRAINING_COSTS.no_cert)}
                            /instructor
                          </SelectItem>
                          <SelectItem value="with_cert">
                            Teacher Training (with IBM cert) -{" "}
                            {formatINR(TEACHER_TRAINING_COSTS.with_cert)}
                            /instructor
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                {/* Instructor Count */}
                <form.Field
                  name="instructorCount"
                  validators={{
                    onChange: ({ value }) => {
                      const result =
                        fieldSchemas.instructorCount.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="instructor-count">
                        Number of Instructors
                      </Label>
                      <Input
                        id="instructor-count"
                        type="number"
                        min="0"
                        max="10"
                        value={field.state.value}
                        onChange={(e) => {
                          const value = Math.max(
                            0,
                            Math.min(10, parseInt(e.target.value) || 0),
                          );
                          field.handleChange(value);
                        }}
                        disabled={teacherTraining === "none"}
                        className="w-full"
                      />
                      {teacherTraining === "none" ? (
                        <p className="text-xs text-muted-foreground">
                          Select teacher training to set instructor count.
                        </p>
                      ) : (
                        <p className="text-xs text-muted-foreground">
                          Range: 0-10 instructors
                        </p>
                      )}
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Contact Information */}
        {currentStep === 3 && (
          <Card
            className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}
          >
            <CardHeader className={hideHeader ? "pb-3" : ""}>
              <CardTitle className={hideHeader ? "text-lg" : ""}>
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className={hideHeader ? "space-y-4" : "space-y-6"}>
              <div className="grid gap-4 md:grid-cols-2">
                <form.Field
                  name="name"
                  validators={{
                    onBlur: ({ value }) => {
                      const result = fieldSchemas.name.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium">
                        Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="email"
                  validators={{
                    onBlur: ({ value }) => {
                      const result = fieldSchemas.email.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium">
                        Email <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="phone"
                  validators={{
                    onBlur: ({ value }) => {
                      const result = fieldSchemas.phone.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium">
                        Phone <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>

                <form.Field
                  name="organization"
                  validators={{
                    onBlur: ({ value }) => {
                      const result = fieldSchemas.organization.safeParse(value);
                      return result.success
                        ? undefined
                        : result.error.issues[0]?.message;
                    },
                  }}
                >
                  {(field) => (
                    <div className="space-y-2">
                      <Label
                        htmlFor="organization"
                        className="text-sm font-medium"
                      >
                        Organization <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="organization"
                        type="text"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                      />
                      {field.state.meta.isTouched &&
                        field.state.meta.errors.length > 0 && (
                          <p className="text-sm text-destructive">
                            {field.state.meta.errors.join(", ")}
                          </p>
                        )}
                    </div>
                  )}
                </form.Field>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Summary */}
        {currentStep === 4 && (
          <>
            {/* Package Summary */}
            <Card
              className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}
            >
              <CardHeader className={hideHeader ? "pb-3" : ""}>
                <CardTitle className={hideHeader ? "text-lg" : ""}>
                  Review Your Selection
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedPackage && (
                  <div className="space-y-3">
                    <div>
                      <Label className="text-sm text-muted-foreground">
                        Package
                      </Label>
                      <p className="font-semibold">{selectedPackage.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedPackage.subtitle}
                      </p>
                    </div>
                    <Separator />
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Training Schedule
                        </Label>
                        <p className="font-semibold">
                          {trainingFrequency === "none"
                            ? "No trainer required"
                            : trainingFrequency === "1d"
                              ? "1 day/week (full-day)"
                              : trainingFrequency === "3d"
                                ? "3 days/week (full-day)"
                                : "5 days/week (full-day)"}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm text-muted-foreground">
                          Teacher Training
                        </Label>
                        <p className="font-semibold">
                          {teacherTraining === "none"
                            ? "No teacher training"
                            : teacherTraining === "no_cert"
                              ? "Teacher Training (no IBM cert)"
                              : "Teacher Training (with IBM cert)"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quote Summary */}
            <Card
              className={
                hideHeader
                  ? "border-0 shadow-none bg-primary/5 border-primary/20"
                  : ""
              }
            >
              <CardHeader className={hideHeader ? "pb-3" : ""}>
                <CardTitle
                  className={
                    hideHeader ? "text-lg flex items-center gap-2" : ""
                  }
                >
                  {hideHeader && <span className="text-primary">📊</span>}
                  Quote Summary
                </CardTitle>
              </CardHeader>
              <CardContent
                className="space-y-4"
                role="region"
                aria-live="polite"
                aria-atomic="true"
              >
                <div className="space-y-3">
                  {/* Lab Package Cost */}
                  {selectedPackage && (
                    <div className="flex justify-between items-center bg-linear-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                      <div className="flex flex-col">
                        <span className="font-bold text-base">
                          {selectedPackage.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          Base package
                        </span>
                      </div>
                      <span className="font-bold text-lg text-primary">
                        {selectedPackage.price}
                      </span>
                    </div>
                  )}

                  {selectedPackage?.price.includes("-") && (
                    <p className="text-xs text-muted-foreground">
                      <strong>What affects the range?</strong> Package pricing
                      varies based on component selection, customization level,
                      and institutional requirements.
                    </p>
                  )}

                  <Separator />

                  {/* Training Cost Line Item */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-base">👨‍🏫</span>
                      Training Cost (per year)
                    </span>
                    <span className="font-semibold">
                      {formatINR(trainingFee)}
                    </span>
                  </div>

                  {/* Teacher Training Line Item */}
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="text-base">🎓</span>
                      Teacher Training
                      {instructorCount > 0 &&
                        teacherTraining !== "none" &&
                        ` (${formatINR(TEACHER_TRAINING_COSTS[teacherTraining as keyof typeof TEACHER_TRAINING_COSTS] || 0)}/instructor × ${instructorCount})`}
                    </span>
                    <span className="font-semibold">
                      {formatINR(teacherFee)}
                    </span>
                  </div>

                  <Separator className="my-3" />

                  {/* Estimated Total */}
                  <div className="flex justify-between items-center pt-2 bg-linear-to-r from-green-500/10 to-transparent p-3 rounded-lg -mx-3">
                    <span className="text-base font-semibold flex items-center gap-2">
                      <span className="text-lg">💰</span>
                      Estimated Total Add-ons
                    </span>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {formatINR(totalAddons)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* Navigation Buttons */}
        <div
          className={
            hideHeader
              ? "sticky bottom-0 -mx-6 -mb-4 px-6 py-4 bg-background border-t mt-6 flex gap-3"
              : "flex gap-3"
          }
        >
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={handleBack}
              className="flex-1"
            >
              Back
            </Button>
          )}

          {currentStep < 4 ? (
            <Button
              type="button"
              size="lg"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !isStep1Valid) ||
                (currentStep === 2 && !isStep2Valid) ||
                (currentStep === 3 && !isStep3Valid)
              }
              className="flex-1"
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              size="lg"
              className="flex-1"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Submitting..." : "Request Quote"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}
