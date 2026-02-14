import { useState, useEffect } from "react";
import type { SubmitEvent } from "react";
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

interface FormState {
  packageId: number;
  trainingFrequency: "none" | "1d" | "3d" | "5d";
  trainerPreference: "male" | "female" | "no_preference";
  teacherTraining: "none" | "no_cert" | "with_cert";
  instructorCount: number;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  organization: string;
}

interface QuoteBuilderProps {
  onSuccess?: () => void;
  hideHeader?: boolean;
}

export function QuoteBuilder({ onSuccess, hideHeader = false }: QuoteBuilderProps = {}) {
  const ref = useScrollFadeIn();
  const mutation = usePackageQuoteMutation();

  const [formState, setFormState] = useState<FormState>({
    packageId: 1,
    trainingFrequency: "none",
    trainerPreference: "no_preference",
    teacherTraining: "none",
    instructorCount: 0,
  });

  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phone: "",
    organization: "",
  });

  const [trainingFee, setTrainingFee] = useState(0);
  const [teacherFee, setTeacherFee] = useState(0);

  // Calculate fees whenever form state changes
  useEffect(() => {
    const trainingCost =
      TRAINING_COSTS[
        formState.trainingFrequency as keyof typeof TRAINING_COSTS
      ] || 0;
    const teacherTrainingCost =
      (TEACHER_TRAINING_COSTS[
        formState.teacherTraining as keyof typeof TEACHER_TRAINING_COSTS
      ] || 0) * formState.instructorCount;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTrainingFee(trainingCost);
    setTeacherFee(teacherTrainingCost);
  }, [formState]);

  // Auto-disable and reset instructor count when teacher training is "none"
  useEffect(() => {
    if (formState.teacherTraining === "none" && formState.instructorCount > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormState((prev) => ({ ...prev, instructorCount: 0 }));
    }
  }, [formState.teacherTraining, formState.instructorCount]);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const selectedPackage = LAB_PACKAGES.find(
      (pkg) => pkg.id === formState.packageId,
    );
    if (!selectedPackage) return;

    const totalAddons = trainingFee + teacherFee;

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
          toast.success("Quote request submitted successfully!", {
            description: "We'll get back to you soon.",
          });
          // Reset form on success
          setFormState({
            packageId: 1,
            trainingFrequency: "none",
            trainerPreference: "no_preference",
            teacherTraining: "none",
            instructorCount: 0,
          });
          setContactInfo({
            name: "",
            email: "",
            phone: "",
            organization: "",
          });
          // Call the onSuccess callback if provided
          onSuccess?.();
        },
        onError: () => {
          toast.error("Failed to submit quote request", {
            description: "Please try again or contact us directly.",
          });
        },
      },
    );
  };

  const totalAddons = trainingFee + teacherFee;
  const isSubmitDisabled =
    !contactInfo.name ||
    !contactInfo.email ||
    !contactInfo.phone ||
    !contactInfo.organization ||
    mutation.isPending;

  return (
    <div ref={ref} className="w-full">
      {!hideHeader && (
        <SectionHeader
          title="Build Your Custom Quote"
          subtitle="Configure your training needs and get an instant quote"
        />
      )}

      <form onSubmit={handleSubmit} className={hideHeader ? "space-y-4" : "max-w-6xl mx-auto space-y-8"}>
        {/* Package Selection */}
        <Card className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}>
          <CardHeader className={hideHeader ? "pb-3" : ""}>
            <CardTitle className={hideHeader ? "text-lg" : ""}>Select Your Lab Package</CardTitle>
          </CardHeader>
          <CardContent className={hideHeader ? "space-y-4" : "space-y-6"}>
            <div className="space-y-2">
              <Label htmlFor="package">
                Lab Package <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formState.packageId.toString()}
                onValueChange={(value) =>
                  setFormState((prev) => ({
                    ...prev,
                    packageId: parseInt(value),
                  }))
                }
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
                      <div className="flex flex-col gap-1">
                        <div className="font-semibold">{pkg.name}</div>
                        <div className="text-xs text-muted-foreground">{pkg.price}</div>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formState.packageId > 0 && (
                <div className="rounded-lg bg-primary/5 border border-primary/10 p-3">
                  <p className="text-sm text-muted-foreground">
                    {
                      LAB_PACKAGES.find((p) => p.id === formState.packageId)
                        ?.subtitle
                    }
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-1">
                    ⏱️ Setup: {LAB_PACKAGES.find((p) => p.id === formState.packageId)?.setupTime}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Training Configuration */}
        <Card className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}>
          <CardHeader className={hideHeader ? "pb-3" : ""}>
            <CardTitle className={hideHeader ? "text-lg" : ""}>Training Configuration</CardTitle>
          </CardHeader>
          <CardContent className={hideHeader ? "space-y-4" : "space-y-6"}>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Training Frequency */}
              <div className="space-y-2">
                <Label htmlFor="training-frequency">Training Schedule</Label>
                <Select
                  value={formState.trainingFrequency}
                  onValueChange={(value: FormState["trainingFrequency"]) =>
                    setFormState((prev) => ({
                      ...prev,
                      trainingFrequency: value,
                    }))
                  }
                >
                  <SelectTrigger id="training-frequency">
                    <SelectValue placeholder="Select training schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">
                      No trainer required - {formatINR(0)}/year
                    </SelectItem>
                    <SelectItem value="1d">
                      1 day/week (full-day) - {formatINR(TRAINING_COSTS["1d"])}
                      /year
                    </SelectItem>
                    <SelectItem value="3d">
                      3 days/week (full-day) - {formatINR(TRAINING_COSTS["3d"])}
                      /year
                    </SelectItem>
                    <SelectItem value="5d">
                      5 days/week (full-day) - {formatINR(TRAINING_COSTS["5d"])}
                      /year
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Trainer Preference */}
              <div className="space-y-2">
                <Label htmlFor="trainer-preference">Trainer Preference</Label>
                <Select
                  value={formState.trainerPreference}
                  onValueChange={(value: FormState["trainerPreference"]) =>
                    setFormState((prev) => ({
                      ...prev,
                      trainerPreference: value,
                    }))
                  }
                  disabled={formState.trainingFrequency === "none"}
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
                  onValueChange={(value: FormState["teacherTraining"]) =>
                    setFormState((prev) => ({
                      ...prev,
                      teacherTraining: value,
                    }))
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
                      Teacher Training (no IBM cert) -{" "}
                      {formatINR(TEACHER_TRAINING_COSTS.no_cert)}/instructor
                    </SelectItem>
                    <SelectItem value="with_cert">
                      Teacher Training (with IBM cert) -{" "}
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
                      instructorCount: Math.max(
                        0,
                        Math.min(10, parseInt(e.target.value) || 0),
                      ),
                    }))
                  }
                  disabled={formState.teacherTraining === "none"}
                  className="w-full"
                />
                <p className="text-xs text-muted-foreground">
                  Range: 0-10 instructors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <Card className={hideHeader ? "border-0 shadow-none bg-muted/30" : ""}>
          <CardHeader className={hideHeader ? "pb-3" : ""}>
            <CardTitle className={hideHeader ? "text-lg" : ""}>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className={hideHeader ? "space-y-4" : "space-y-6"}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-medium">
                  Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  type="text"
                  value={contactInfo.name}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-medium">
                  Phone <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contactInfo.phone}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="organization" className="text-sm font-medium">
                  Organization <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="organization"
                  type="text"
                  value={contactInfo.organization}
                  onChange={(e) =>
                    setContactInfo((prev) => ({
                      ...prev,
                      organization: e.target.value,
                    }))
                  }
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quote Summary */}
        <Card className={hideHeader ? "border-0 shadow-none bg-primary/5 border-primary/20" : ""}>
          <CardHeader className={hideHeader ? "pb-3" : ""}>
            <CardTitle className={hideHeader ? "text-lg flex items-center gap-2" : ""}>
              {hideHeader && <span className="text-primary">📊</span>}
              Quote Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {/* Lab Package Cost */}
              {(() => {
                const selectedPackage = LAB_PACKAGES.find(
                  (pkg) => pkg.id === formState.packageId,
                );
                return selectedPackage ? (
                  <div className="flex justify-between items-center bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                    <div className="flex flex-col">
                      <span className="font-bold text-base">
                        {selectedPackage.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {selectedPackage.subtitle}
                      </span>
                    </div>
                    <span className="font-bold text-lg text-primary">
                      {selectedPackage.price}
                    </span>
                  </div>
                ) : null;
              })()}

              {(trainingFee > 0 || teacherFee > 0) && <Separator />}

              {/* Training Cost Line Item */}
              {trainingFee > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-base">👨‍🏫</span>
                    Training Cost (per year)
                  </span>
                  <span className="font-semibold">{formatINR(trainingFee)}</span>
                </div>
              )}

              {/* Teacher Training Line Item */}
              {teacherFee > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="text-base">🎓</span>
                    Teacher Training ({formState.instructorCount}{" "}
                    {formState.instructorCount === 1
                      ? "instructor"
                      : "instructors"}
                    )
                  </span>
                  <span className="font-semibold">{formatINR(teacherFee)}</span>
                </div>
              )}

              {totalAddons === 0 && (
                <div className="text-center py-6 space-y-2">
                  <div className="text-4xl opacity-50">📝</div>
                  <p className="text-sm text-muted-foreground">
                    Configure your training options above to see additional costs
                  </p>
                </div>
              )}
            </div>

            {totalAddons > 0 && (
              <>
                <Separator className="my-3" />
                <div className="flex justify-between items-center pt-2 bg-gradient-to-r from-green-500/10 to-transparent p-3 rounded-lg -mx-3">
                  <span className="text-base font-semibold flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    Total Add-ons Cost
                  </span>
                  <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {formatINR(totalAddons)}
                  </span>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className={hideHeader ? "sticky bottom-0 -mx-6 -mb-4 px-6 py-4 bg-background border-t mt-6" : ""}>
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={isSubmitDisabled}
          >
            {mutation.isPending ? "Submitting..." : "Request Quote"}
          </Button>
        </div>
      </form>
    </div>
  );
}
