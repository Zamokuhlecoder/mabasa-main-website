import { z } from "zod";

export const roleOptions = [
  "Frontend",
  "Backend",
  "Mobile",
  "QA and testing",
  "DevOps and cloud",
  "Data and AI",
  "UI and UX design",
  "Project lead",
] as const;

export const teamSizeOptions = [
  "1 to 2 people",
  "3 to 5 people",
  "6 to 10 people",
  "More than 10",
  "Not sure yet",
] as const;
export const durationOptions = [
  "Under 3 months",
  "3 to 6 months",
  "6 to 12 months",
  "Ongoing",
  "Not sure yet",
] as const;
export const startOptions = ["As soon as possible", "Within a month", "In 2 to 3 months", "Just exploring"] as const;

export const proposalSchema = z.object({
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
  roles: z.array(z.enum(roleOptions)).min(1, "Choose at least one role you need.").max(roleOptions.length),
  teamSize: z.enum(teamSizeOptions, { message: "Please choose a team size." }),
  duration: z.enum(durationOptions, { message: "Please choose how long you need the team." }),
  start: z.enum(startOptions, { message: "Please choose when you want to start." }),
  message: z
    .string({ error: "Please tell us what you want to build." })
    .trim()
    .min(20, "Please tell us a little more, at least 20 characters.")
    .max(5000, "Please keep this under 5,000 characters."),
  consent: z.literal(true, { message: "Please tick the box to agree to how we'll use your information." }),
  // Spam protection: must stay empty / be a plausible render timestamp.
  website: z.string().max(0).optional().or(z.literal("")),
  startedAt: z.number().int().positive(),
});

export type ProposalInput = z.infer<typeof proposalSchema>;
