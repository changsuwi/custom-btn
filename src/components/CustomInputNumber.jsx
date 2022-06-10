import React, { useState, useEffect, useRef } from "react";
import { IsNumber } from "../utils/Utils";

const ActionType = {
  add: "add",
  minus: "minus",
};

const CustomInputNumber = ({
  min,
  max,
  step,
  name,
  value,
  disabled,
  onBlur,
  onChange,
}) => {
  const [displayNumber, setDisplayNumber] = useState(value);
  const [isHold, setIsHold] = useState(false);
  const [onHoldAction, setOnHoldAction] = useState(undefined);
  const firstUpdate = useRef(true);
  let holdEventId;

  const onClickMinus = () => {
    if (onHoldAction) {
      return;
    }
    if ((displayNumber === "" || displayNumber === "-") && min >= 0) {
      setDisplayNumber(min);
      return;
    }
    let newValue =
      displayNumber === "" || displayNumber === "-" ? -1 : displayNumber - step;
    if (newValue >= min) {
      if (newValue > max) {
        newValue = max;
      }
      setDisplayNumber(newValue);
    }
  };

  const onClickAdd = () => {
    if (onHoldAction) {
      return;
    }
    if ((displayNumber === "" || displayNumber === "-") && max <= 0) {
      setDisplayNumber(max);
      return;
    }
    let newValue =
      displayNumber === "" || displayNumber === "-" ? 1 : displayNumber + step;
    if (newValue <= max) {
      if (newValue < min) {
        newValue = min;
      }
      setDisplayNumber(newValue);
    }
  };

  const onChangeInput = (event) => {
    if (event.target.value === "" || event.target.value === "-") {
      setDisplayNumber(event.target.value);
      return;
    }
    if (IsNumber(event.target.value)) {
      setDisplayNumber(Number(event.target.value));
    }
  };

  const setupHoldEvent = (action) => {
    setIsHold(true);
    setOnHoldAction(action);
  };

  const removeHoldEvent = () => {
    setIsHold(false);
    setOnHoldAction(undefined);
    clearInterval(holdEventId);
  };

  // Handle holdling button
  useEffect(() => {
    if (isHold) {
      // When user is pressing the button while the displayNumber is reaching the limit, the button will be disabled so that it will not trigger onMouseUp event
      // Hence, it do removeHoldEvent below
      if (
        (displayNumber >= max && onHoldAction === ActionType.add) ||
        (displayNumber <= min && onHoldAction === ActionType.minus)
      ) {
        removeHoldEvent();
        return;
      }

      // add a event to handle the behavior of holding button
      holdEventId = setInterval(() => {
        let newNumber =
          onHoldAction === ActionType.add
            ? displayNumber + step
            : displayNumber - step;
        if (newNumber < min && ActionType.add === onHoldAction) {
          newNumber = min;
        }
        if (newNumber > max && ActionType.minus === onHoldAction) {
          newNumber = max;
        }
        if (
          (newNumber <= max && ActionType.add === onHoldAction) ||
          (newNumber >= min && ActionType.minus === onHoldAction)
        ) {
          setDisplayNumber(newNumber);
        }
      }, 200);
      return () => clearInterval(holdEventId);
    }
  }, [isHold, displayNumber, onHoldAction]);

  // Trigger onChange event when displayNumber changed
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    onChange({
      target: {
        name,
        value: displayNumber,
      },
    });
  }, [displayNumber]);

  return (
    <div>
      <button
        className="w-12 h-12 border border-blue-30 text-center rounded mr-2 disabled:border-gray-300"
        onClick={onClickMinus}
        disabled={disabled || displayNumber <= min}
        onMouseDown={() => setupHoldEvent(ActionType.minus)}
        onMouseUp={removeHoldEvent}
      >
        -
      </button>
      <input
        className="w-12 h-12 border border-gray-90 text-center mr-2"
        type="text"
        value={displayNumber}
        onChange={onChangeInput}
        onBlur={() =>
          onBlur({
            target: {
              name,
              value: displayNumber,
            },
          })
        }
        disabled={disabled}
      />
      <button
        className="w-12 h-12 border border-blue-30 text-center rounded disabled:border-gray-300"
        onClick={onClickAdd}
        disabled={disabled || (displayNumber >= max && displayNumber !== "")}
        onMouseDown={() => setupHoldEvent(ActionType.add)}
        onMouseUp={removeHoldEvent}
      >
        +
      </button>
    </div>
  );
};

export default CustomInputNumber;
