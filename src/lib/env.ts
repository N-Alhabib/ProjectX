import { z } from "zod";

const rawEnv = {
  DATABASE_URL: process.env.DATABASE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_DAYS: process.env.SESSION_DAYS,
  EVENT_START: process.env.EVENT_START,
  EVENT_END: process.env.EVENT_END,
  APP_BASE_URL:
    process.env.APP_BASE_URL && process.env.APP_BASE_URL.trim() !== ""
      ? process.env.APP_BASE_URL
      : undefined,
};

const envSchema = z.object({
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
  SESSION_SECRET: z.string().min(1, "SESSION_SECRET is required"),
  SESSION_DAYS: z.coerce
    .number()
    .int("SESSION_DAYS must be an integer")
    .positive("SESSION_DAYS must be positive")
    .default(30),
  EVENT_START: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "EVENT_START must be YYYY-MM-DD"),
  EVENT_END: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "EVENT_END must be YYYY-MM-DD"),
  APP_BASE_URL: z.string().url("APP_BASE_URL must be a valid URL").optional(),
});

const requiredKeys = [
  "DATABASE_URL",
  "SESSION_SECRET",
  "EVENT_START",
  "EVENT_END",
] as const;

const missingKeys = requiredKeys.filter((key) => {
  const value = rawEnv[key];
  return !value || value.trim() === "";
});

const parsed = envSchema.safeParse(rawEnv);

if (missingKeys.length > 0 || !parsed.success) {
  const invalidKeys =
    parsed.success === false
      ? Array.from(
          new Set(parsed.error.issues.map((issue) => issue.path.join(".")))
        )
      : [];

  const parts = [
    missingKeys.length > 0
      ? `Missing env keys: ${missingKeys.join(", ")}.`
      : null,
    invalidKeys.length > 0
      ? `Invalid env keys: ${invalidKeys.join(", ")}.`
      : null,
  ].filter(Boolean);

  const message = parts.length
    ? `Invalid environment configuration. ${parts.join(" ")}`
    : "Invalid environment configuration.";

  throw new Error(message);
}

export const env = parsed.data;
