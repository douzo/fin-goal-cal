// SaveLoadReset.js
import React from "react";

function SaveLoadReset({ handleSave, handleLoad }) {
  // Implement the SaveLoadReset component here
  return (
    <div className="display-flex justify-content-flex-end">

    <button data-tooltip-id="save-tooltip" className="background-color-black margin-right-1rem" onClick={() => handleSave()}>
      Save
    </button>
    <button data-tooltip-id="load-tooltip" className="background-color-black" onClick={() => handleLoad()}>
      Load
    </button>
  </div>
  );
}

export default SaveLoadReset;