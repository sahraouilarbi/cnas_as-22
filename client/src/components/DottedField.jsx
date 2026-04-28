/**
 * Utility: DottedField component for underlined fields
 */
export const DottedField = ({ label, value, className = "" }) => (
  <div className={`flex items-baseline gap-1 ${className}`}>
    {label && <span className="whitespace-nowrap">{label}</span>}
    <span className="inline-block border-b border-dotted border-black flex-grow min-h-[1.2em] px-1 font-bold text-[11px] overflow-hidden whitespace-nowrap text-ellipsis">
      {value || ""}
    </span>
  </div>
);
