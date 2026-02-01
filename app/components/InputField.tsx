import BaseInputField, {
  type BaseInputFieldProps,
} from "~/components/BaseInputField";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type -- This interface is declared for simplicity.
export interface InputFieldProps extends Omit<BaseInputFieldProps, "as"> {}

export default function InputField(props: InputFieldProps) {
  return <BaseInputField as="input" {...props} />;
}
