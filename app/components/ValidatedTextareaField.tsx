import TextareaField, {
  type TextareaFieldProps,
} from "~/components/TextareaField";
import { type FormScope, useField } from "@rvf/react-router";

interface ValidatedTextarea extends TextareaFieldProps {
  scope: FormScope<string>;
}

export default function ValidatedTextareaField({
  scope,
  ...rest
}: ValidatedTextarea) {
  const field = useField(scope);

  return (
    <TextareaField
      {...field.getInputProps(rest)}
      errorMessage={field.error() ?? undefined}
    />
  );
}
