import InputField, { type InputFieldProps } from "~/components/InputField";
import { type FormScope, useField } from "@rvf/react-router";

interface ValidatedTextField extends Omit<InputFieldProps, "type"> {
  scope: FormScope<string>;
}

export default function ValidatedTextField({
  scope,
  ...rest
}: ValidatedTextField) {
  const field = useField(scope);

  return (
    <InputField
      {...field.getInputProps(rest)}
      type="text"
      errorMessage={field.error() ?? undefined}
    />
  );
}
