import React, { HTMLProps } from "react";
import styles from "./RadioGroup.module.sass";
import clsx from "clsx";

interface Props extends HTMLProps<HTMLFieldSetElement> {
  label?: string;
}

const RadioGroup: React.FC<Props> = ({ label, children, ...rest }) => {
  return (
    <fieldset {...rest} className={clsx("field", styles.root)}>
      {label ? <legend>{label}</legend> : null}
      <div className={styles.fields}>{children}</div>
    </fieldset>
  );
};

export default RadioGroup;
