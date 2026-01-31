import { z } from "zod";

// ***** Util functions *****

const emptyStringToUndefined = (obj: unknown) => {
  if (typeof obj !== "object" || obj === null) return obj;

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [
      key,
      value === "" ? undefined : value,
    ]),
  );
};

// ***** Util schemas *****

const trueFalse = z
  .enum(["true", "false"])
  .transform((value) => value === "true");

// ***** Server envs *****

const serverEnvsObject = {
  // Define server envs here
  SENTRY_AUTH_TOKEN: z.string().optional(),
  SENTRY_URL: z.url().optional(),
  SENTRY_ORG: z.string().optional(),
  SENTRY_PROJECT: z.string().optional(),
  ENABLE_SENTRY_EXAMPLE_PAGE: trueFalse.default(false),
};

// ***** Client envs *****

const clientEnvsObject = {
  // Define client envs here
  PUBLIC_SENTRY_DSN: z.string().optional(),
  PUBLIC_PLAUSIBLE_DOMAIN: z.string().optional(),
  PUBLIC_PLAUSIBLE_ENDPOINT: z.url().optional(),
  PUBLIC_PLAUSIBLE_CAPTURE_ON_LOCALHOST: trueFalse.default(false),
};

const clientEnvSchema = z.object(clientEnvsObject);
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
    clientEnvSchema.extend(serverEnvsObject),
  )
  .parse(process.env);

export { serverEnv, serverSideClientEnv };
