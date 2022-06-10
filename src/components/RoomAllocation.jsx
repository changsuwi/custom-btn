import React, { useState, useEffect } from "react";
import CustomInputNumber from "./CustomInputNumber";
import { Min } from "../utils/Utils";

const CustomInputType = {
  adult: "adult",
  child: "child",
};

const RoomAllocation = ({ guest, room, onChange }) => {
  const [allocation, setAllocation] = useState(
    Array.from({ length: room }).map(() => ({
      adult: 1,
      child: 0,
    }))
  );

  const numberOfNotAllocated = () => {
    return (
      guest -
      allocation.reduce(
        (prev, room) => (prev = prev + room.adult + room.child),
        0
      )
    );
  };

  useEffect(() => {
    onChange(allocation);
  }, [numberOfNotAllocated()]);

  const customInputMax = (type, idx) => {
    if (type === CustomInputType.adult) {
      return Min(
        numberOfNotAllocated() + allocation[idx].adult,
        4 - allocation[idx].child
      );
    } else {
      return Min(
        numberOfNotAllocated() + allocation[idx].child,
        4 - allocation[idx].adult
      );
    }
  };

  return (
    <div className="flex flex-col p-4 border border-dashed w-full text-gray-700">
      <div className="mb-4">
        住客人數 {guest} 人 / {room} 房
      </div>
      <div className="bg-blue-50 p-4 rounded mb-4">
        尚未分配人數: {numberOfNotAllocated()} 人
      </div>
      {Array.from({ length: room }).map((_roomItem, idx) => (
        <div key={idx} className="mb-4 border-b">
          <p className="mb-2">
            房間: {allocation[idx].adult + allocation[idx].child} 人
          </p>
          <div className="flex justify-between mb-4">
            <div>
              <p>大人:</p>
              <p className="text-sm text-gray-500">年齡 20+</p>
            </div>

            <CustomInputNumber
              name="adult"
              min={1}
              max={customInputMax(CustomInputType.adult, idx)}
              step={1}
              value={1}
              disabled={false}
              onChange={(event) => {
                const value = event.target.value;
                const name = event.target.name;
                console.log("CustomInputNumberonChangeEvent", name, value);

                if (
                  value === "" ||
                  value === "-" ||
                  value > customInputMax(CustomInputType.adult, idx) ||
                  value < 1
                ) {
                  return;
                }
                const newallocation = Array.from(allocation);
                newallocation[idx] = {
                  adult: value,
                  child: allocation[idx].child,
                };
                setAllocation(newallocation);
              }}
              onBlur={(event) => {
                console.log(
                  "CustomInputNumberonBlurEvent",
                  event.target.name,
                  event.target.value
                );
              }}
            />
          </div>
          <div className="flex justify-between mb-4">
            小孩：
            <CustomInputNumber
              name="child"
              min={0}
              max={customInputMax(CustomInputType.child, idx)}
              step={1}
              value={0}
              disabled={false}
              onChange={(event) => {
                const value = event.target.value;
                const name = event.target.name;
                console.log(
                  "CustomInputNumberonChangeEvent",
                  event.target.name,
                  event.target.value
                );
                if (
                  value === "" ||
                  value === "-" ||
                  value > customInputMax(CustomInputType.child, idx) ||
                  value < 0
                ) {
                  return;
                }
                const newallocation = Array.from(allocation);
                newallocation[idx] = {
                  adult: allocation[idx].adult,
                  child: event.target.value,
                };
                setAllocation(newallocation);
              }}
              onBlur={(event) => {
                console.log(
                  "CustomInputNumberonBlurEvent",
                  event.target.name,
                  event.target.value
                );
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default RoomAllocation;
