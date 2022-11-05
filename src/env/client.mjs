// I don't really care about this
/* eslint-disable no-underscore-dangle */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
// @ts-check
import { clientEnv as clientEnvironment, clientSchema } from "./schema.mjs";

const parsedClientEnvironment = clientSchema.safeParse(clientEnvironment);

export const formatErrors = (
  /** @type {import('zod').ZodFormattedError<Map<string,string>,string>} */
  errors
) =>
  Object.entries(errors)
    .map(([name, value]) => {
      if (value && "_errors" in value)
        return `${name}: ${value._errors.join(", ")}\n`;
    })
    .filter(Boolean);

if (!parsedClientEnvironment.success) {
  console.error(
    "❌ Invalid environment variables:\n",
    ...formatErrors(parsedClientEnvironment.error.format())
  );
  throw new Error("Invalid environment variables");
}

for (const key of Object.keys(parsedClientEnvironment.data)) {
  if (!key.startsWith("NEXT_PUBLIC_")) {
    console.warn(
      `❌ Invalid public environment variable name: ${key}. It must begin with 'NEXT_PUBLIC_'`
    );

    throw new Error("Invalid public environment variable name");
  }
}

export const env = parsedClientEnvironment.data;
