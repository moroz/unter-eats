import { ErrorMessage } from "@hookform/error-message";
import styles from "./InputField.module.sass";

const ERROR_MESSAGES: Record<any, string> = {
  required: "To pole nie może być puste."
};

const ErrorMessageWrapper: typeof ErrorMessage = ({
  errors,
  name,
  ...rest
}) => {
  if (!errors?.[name]) return null;

  const error = errors[name];
  return (
    <ErrorMessage
      as="span"
      className={styles.errorMessage}
      errors={errors}
      name={name}
      message={error.message || ERROR_MESSAGES[error.type]}
      {...rest}
    />
  );
};

export default ErrorMessageWrapper;
