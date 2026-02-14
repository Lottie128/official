import { z } from "zod";

// Training frequency options
export const trainingFrequencyEnum = z.enum(["none", "1d", "3d", "5d"]);

// Trainer preference options
export const trainerPreferenceEnum = z.enum([
  "no_preference",
  "male",
  "female",
]);

// Teacher training options
export const teacherTrainingEnum = z.enum(["none", "no_cert", "with_cert"]);

// Phone validation: strip spaces/dashes and check 10-15 digits
const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine(
    (val) => {
      const digitsOnly = val.replace(/[\s\-]/g, "");
      return /^\d{10,15}$/.test(digitsOnly);
    },
    {
      message: "Phone must contain 10-15 digits",
    }
  );

// Base schema without refinements (for picking)
const baseQuoteRequestSchema = z.object({
  // Package selection
  packageId: z.number().min(1, "Please select a package"),

  // Training configuration
  trainingFrequency: trainingFrequencyEnum,
  trainerPreference: trainerPreferenceEnum,
  teacherTraining: teacherTrainingEnum,
  instructorCount: z.number().min(0).max(10),

  // Contact information
  name: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: phoneSchema,
  organization: z.string().min(1, "Organization is required"),
});

// Step-specific schemas for validation (pick from base schema)
export const step1Schema = baseQuoteRequestSchema.pick({ packageId: true });

export const step2Schema = baseQuoteRequestSchema.pick({
  trainingFrequency: true,
  trainerPreference: true,
  teacherTraining: true,
  instructorCount: true,
});

export const step3Schema = baseQuoteRequestSchema.pick({
  name: true,
  email: true,
  phone: true,
  organization: true,
});

// Full schema with cross-field validation refinements
export const quoteRequestSchema = baseQuoteRequestSchema
  .refine(
    (data) => {
      // Trainer preference is required when training is not "none"
      if (data.trainingFrequency !== "none") {
        return data.trainerPreference !== undefined;
      }
      return true;
    },
    {
      message: "Please select a trainer preference",
      path: ["trainerPreference"],
    }
  )
  .refine(
    (data) => {
      // Instructor count must be > 0 when teacher training is not "none"
      if (data.teacherTraining !== "none") {
        return data.instructorCount > 0;
      }
      return true;
    },
    {
      message: "Number of instructors must be at least 1",
      path: ["instructorCount"],
    }
  )
  .refine(
    (data) => {
      // Instructor count must be 0 when teacher training is "none"
      if (data.teacherTraining === "none") {
        return data.instructorCount === 0;
      }
      return true;
    },
    {
      message: "Instructor count must be 0 when no teacher training is selected",
      path: ["instructorCount"],
    }
  );

export type QuoteRequestFormData = z.infer<typeof quoteRequestSchema>;

// Step 4 uses the full schema for final validation
