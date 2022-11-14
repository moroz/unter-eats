import React, { HTMLProps } from "react";
import { useFormContext } from "react-hook-form";
import ErrorMessage from "./ErrorMessageWrapper";
import clsx from "clsx";
import styles from "./InputField.module.sass";

interface Props extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  helperText?: string;
  horizontal?: boolean;
  monospace?: boolean;
  colSpan?: number;
}

const InputField = React.forwardRef(
  (
    {
      name,
      label,
      helperText,
      className,
      horizontal,
      monospace,
      required,
      id = name,
      colSpan,
      ...rest
    }: Props,
    ref: any
  ) => {
    const {
      formState: { errors }
    } = useFormContext();

    const labelTag = label && (
      <label
        className={clsx(required && styles.required, styles.label)}
        htmlFor={id}
      >
        {label}{" "}
        {required ? (
          ""
        ) : (
          <span className={styles.optionalText}>(opcjonalnie)</span>
        )}
      </label>
    );

    const style = {
      "--input-col-span": String(colSpan)
    } as React.CSSProperties;

    return (
      <div
        style={style}
        className={clsx(
          styles.root,
          errors[name] && styles.hasError,
          className
        )}
      >
        {labelTag}
        <input
          className={clsx(
            styles.input,
            errors[name] && "is-danger",
            monospace && "is-family-monospace"
          )}
          id={id}
          name={name}
          {...rest}
          ref={ref}
        />
        <ErrorMessage name={name} errors={errors} />
        {helperText ? <span className={styles.help}>{helperText}</span> : null}
      </div>
    );
  }
);

export default InputField;
