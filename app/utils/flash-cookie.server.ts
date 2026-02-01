import { createCookieSessionStorage } from "react-router";
import type { ZodType } from "zod";

const { getSession, commitSession } = createCookieSessionStorage({
  cookie: {
    name: "__flash",
    httpOnly: true,
    maxAge: 300,
    path: "/",
    sameSite: "lax",
  },
});

export async function setFlashCookie(name: string, value: unknown) {
  const session = await getSession();
  session.flash(name, value);
  return {
    "Set-Cookie": await commitSession(session),
  };
}

/**
 * Reads a flash cookie from the session and validates its data against the provided schema.
 *
 * @param request - The incoming request object containing HTTP headers.
 * @param name - The name of the flash cookie to retrieve from the session.
 * @param schema - A Zod schema used to validate the flash cookie's data.
 * @return A tuple containing the validation result of the flash cookie data and a "Set-Cookie" header for session commitment.
 */
export async function readFlashCookie<S extends ZodType>(
  request: Request,
  name: string,
  schema: S,
) {
  const session = await getSession(request.headers.get("Cookie"));
  const data = session.get(name);
  return [
    schema.safeParse(data),
    { "Set-Cookie": await commitSession(session) },
  ] as const;
}
