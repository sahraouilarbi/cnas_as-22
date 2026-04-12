/**
 * Technical Footer: Side marker
 */
export const TechnicalFooter = ({ dateImp, numImp }) => (
    <div className="absolute right-2 bottom-48 rotate-[-90deg] origin-right text-[6px] text-gray-500 font-sans uppercase tracking-tighter">
        {/* IMP CNAS 11-2022 - AS.22 */}
        IMP CNAS {dateImp} - {numImp}
    </div>
);
