import BaseInputField, {
  type BaseInputFieldProps,
} from "~/components/BaseInputField";

export default function NumberField(props: Omit<BaseInputFieldProps, "as">) {
  return <BaseInputField as="input" {...props} />;
}
