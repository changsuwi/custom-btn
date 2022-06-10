import React from "react";
import "./App.css";
import RoomAllocation from "./components/RoomAllocation";
const App = () => {
  return (
    <div className="w-full max-w-3xl p-4">
      <RoomAllocation
        guest={13}
        room={4}
        onChange={(result) =>
          console.log("RoomAllocationOnChangeEvent", result)
        }
      />
    </div>
  );
};

export default App;
