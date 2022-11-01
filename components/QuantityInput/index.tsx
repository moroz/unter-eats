import React, {
  ChangeEventHandler,
  useCallback,
  useEffect,
  useState
} from "react";
import styles from "./QuantityInput.module.sass";
import clsx from "clsx";
import PlusIcon from "@icons/plus.svg";
import MinusIcon from "@icons/minus.svg";

interface Props {
  value: number;
  onChangeQuantity: (quantity: number) => void;
  className?: string;
}

const QuantityInput: React.FC<Props> = ({
  value,
  onChangeQuantity,
  className
}) => {
  const [inputValue, setValue] = useState(String(value));

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const newValue = e.target.value;
      if (newValue.trim() === "") {
        setValue("");
        return;
      }
      onChangeQuantity(Number(newValue));
    },
    [onChangeQuantity]
  );

  const onBlur: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      if (e.target?.value.trim() === "") {
        setValue(String(value));
        return;
      }
    },
    [value]
  );

  useEffect(() => {
    setValue(String(value));
  }, [value]);

  const onIncrement = useCallback(
    (step: number) => () => {
      onChangeQuantity(Number(value) + step);
    },
    [value, onChangeQuantity]
  );

  return (
    <div className={clsx(styles.group, className)}>
      <button onClick={onIncrement(-1)} disabled={value === 1}>
        <MinusIcon />
      </button>
      <input value={inputValue} onChange={onChange} onBlur={onBlur} />
      <button onClick={onIncrement(1)}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default QuantityInput;
