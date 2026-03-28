import { type FormScope, useField } from "@rvf/react-router";

import InputField, { type InputFieldProps } from "~/components/InputField";

interface ValidatedTextField extends Omit<InputFieldProps, "type"> {
  scope: FormScope<string>;
  type?: "text" | "password";
}

export default function ValidatedTextField({
  scope,
  type = "text",
  ...rest
}: ValidatedTextField) {
  const field = useField(scope);

  return (
    <InputField
      {...field.getInputProps(rest)}
      type={type}
      errorMessage={field.error() ?? undefined}
    />
  );
}
