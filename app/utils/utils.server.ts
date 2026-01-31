import { data } from "react-router";

/**
 * Create a not found response. Sets the status code which defaults to 404 Not Found.
 */
export function notFound(
  request: Request,
  init?: Omit<ResponseInit, "status">,
) {
  return data(
    `Error: No route matches URL "${new URL(request.url).pathname}"`,
    {
      statusText: "Not Found",
      ...init,
      status: 404,
    },
  );
}
