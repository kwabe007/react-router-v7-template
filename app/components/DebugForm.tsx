import type { FormApi } from "@rvf/react-router";

interface DebugFormProps<T> {
  form: FormApi<T>;
}

/**
 * Renders a debug view of a form object by serializing it into a JSON string format.
 */
export default function DebugForm<T>({ form }: DebugFormProps<T>) {
  return <pre>{JSON.stringify(form, null, 2)}</pre>;
}
