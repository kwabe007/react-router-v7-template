import { cn } from "~/lib/utils";
import { Label } from "@radix-ui/react-label";
import { Input } from "~/components/ui/input";
import { type ComponentProps, type ComponentType, useId } from "react";
import { Textarea } from "~/components/ui/textarea";
import { match } from "ts-pattern";
import * as React from "react";

interface CommonInputFieldProps {
  label?: string;
  Icon?: ComponentType<{ className?: string }>;
  info?: string;
  errorMessage?: string;
  inputClassName?: string;
}

export interface BaseInputFieldProps
  extends CommonInputFieldProps, ComponentProps<typeof Input> {
  as: "input";
}

export interface BaseTextareaFieldProps
  extends CommonInputFieldProps, ComponentProps<typeof Textarea> {
  as: "textarea";
}

export default function BaseInputField(
  props: BaseInputFieldProps | BaseTextareaFieldProps,
) {
  // If no id is given, use a generated id
  const generatedId = useId();
  const id = props.id ?? generatedId;

  const errorId = useId();
  const infoId = useId();

  const describedByIds: string[] = [];
  if (props.info) describedByIds.push(infoId);
  if (props.errorMessage) describedByIds.push(errorId);
  const ariaDescribedBy =
    describedByIds.length > 0 ? describedByIds.join(" ") : undefined;

  const { label, info, errorMessage, className, ...propsRest } = props;

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label className="block text-sm font-medium leading-none" htmlFor={id}>
          {label}
        </Label>
      )}
      <div className="relative">
        {props.Icon && (
          <props.Icon className="absolute left-3 top-[0.6rem] w-4 h-4 text-muted-foreground" />
        )}
        {match(propsRest)
          .with({ as: "input" }, (inputPropsRest) => {
            const { as: _as, Icon, ...rest } = inputPropsRest;
            return (
              <Input
                {...inputPropsRest}
                className={cn(rest.inputClassName, Icon && "pl-10")}
                id={id}
                aria-describedby={ariaDescribedBy}
                aria-invalid={!!errorMessage}
              />
            );
          })
          .with({ as: "textarea" }, (textareaPropsRest) => {
            const { as: _as, Icon, ...rest } = textareaPropsRest;
            return (
              <Textarea
                {...rest}
                className={cn(rest.inputClassName, Icon && "pl-10")}
                id={id}
                aria-describedby={ariaDescribedBy}
                aria-invalid={!!errorMessage}
              />
            );
          })
          .exhaustive()}
      </div>
      {info && (
        <div className="text-sm text-muted-foreground" id={infoId}>
          {info}
        </div>
      )}
      {errorMessage && (
        <div className="text-sm text-destructive" id={errorId}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}
