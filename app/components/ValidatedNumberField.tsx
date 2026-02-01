import InputField, { type InputFieldProps } from "~/components/InputField";
import { type FormScope, useField } from "@rvf/react-router";

interface ValidatedNumberField extends Omit<InputFieldProps, "type"> {
  scope: FormScope<number>;
}

export default function ValidatedNumberField({
  scope,
  ...rest
}: ValidatedNumberField) {
  const field = useField(scope);

  return (
    <InputField
      {...field.getInputProps(rest)}
      type="number"
      errorMessage={field.error() ?? undefined}
    />
  );
}
