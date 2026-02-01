import BaseInputField, {
  type BaseTextareaFieldProps,
} from "~/components/BaseInputField";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- This interface is declared for simplicity.
export interface TextareaFieldProps extends Omit<
  BaseTextareaFieldProps,
  "as"
> {}

export default function TextareaField(props: TextareaFieldProps) {
  return <BaseInputField as="textarea" {...props} />;
}
