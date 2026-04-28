export const FloatingTitle = ({ title, isUnderline }) => (
  <h3
    className={`absolute bg-white -top-2 left-[50%] transform -translate-x-1/2 px-2 text-center font-black text-[13px] uppercase tracking-widest leading-none whitespace-nowrap ${isUnderline ? "underline underline-offset-1" : "no-underline"}`}
  >
    {title}
  </h3>
);
