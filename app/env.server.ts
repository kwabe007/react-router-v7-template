import { z } from "zod";

const emptyStringToUndefined = (obj: unknown) => {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ]),
  );
};

const trueFalse = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

const clientEnvSchema = z.object({
  PUBLIC_SENTRY_DSN: z.string().optional(),
  PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  PUBLIC_PLAUSIBLE_ENDPOINT: z.url().optional(),
  PUBLIC_PLAUSIBLE_CAPTURE_ON_LOCALHOST: trueFalse.default(false),
});
export type ClientEnv = z.infer<typeof clientEnvSchema>;

const serverSideClientEnv = z
  .preprocess(
    // Treat empty string envs as undefined
    emptyStringToUndefined,
    clientEnvSchema,
  )
  .parse(process.env);

const serverEnv = z
  .preprocess(
    // Treat empty string envs as undefined
    emptyStringToUndefined,
    clientEnvSchema.extend({
      ENABLE_SENTRY_EXAMPLE_PAGE: trueFalse.default(false),
    }),
  )
  .parse(process.env);

export { serverEnv, serverSideClientEnv };
