import { z } from "zod";
import { services } from "./services";

export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"] as const;

export const budgetOptions = [
  "Under R100 000",
  "R100 000 – R250 000",
  "R250 000 – R500 000",
  "R500 000 – R1 000 000",
  "Over R1 000 000",
  "Not yet defined",
] as const;

export const contactSchema = z.object({
  name: z
    .string({ error: "Please enter your full name." })
    .trim()
    .min(2, "Please enter your full name.")
    .max(120, "Name is too long."),
  email: z
    .string({ error: "Please enter your work email address." })
    .trim()
    .toLowerCase()
    .email("Please enter a valid work email address.")
    .max(200),
  company: z
    .string({ error: "Please enter your company name." })
    .trim()
    .min(2, "Please enter your company name.")
    .max(160, "Company name is too long."),
  service: z.enum(serviceOptions, { message: "Please choose a service of interest." }),
  budget: z.union([z.enum(budgetOptions), z.literal("")]).optional(),
  message: z
    .string({ error: "Please describe your project." })
    .trim()
    .min(30, "Please describe your project in at least 30 characters.")
    .max(5000, "Please keep your description under 5,000 characters."),
  consent: z.literal(true, { message: "Please tick the box to agree to how we'll use your information." }),
  // Spam protection - must stay empty / be a plausible render timestamp.
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
