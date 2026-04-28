import React from "react";

/**
 * Utility: CheckBox component for print display
 */
export const CheckBox = ({ label, checked, supValue }) => (
  <label className="flex items-center">
    <span className="inline-block w-3.5 h-3.5 border border-black mr-1 relative align-middle bg-white flex-shrink-0">
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold leading-none">
          X
        </span>
      )}
    </span>{" "}
    {label} {supValue && <sup>({supValue})</sup>}
  </label>
);
