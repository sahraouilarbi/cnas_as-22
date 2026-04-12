/**
 * Section: Blue Header (CNAS Branding)
 */

export const BlueHeader = () => (
  <div className="cnas-bg-blue mb-2 flex justify-between items-center">
    <div className="w-14 h-14"></div>
    <div className="bg-white p-1 rounded-full w-14 h-14 flex items-center justify-center">
      <img src="/img/cnas_logo.png" alt="CNAS" className="w-12" />
    </div>
    <div className="text-center flex-grow">
      <div className="arabic-text text-[11px] font-bold leading-tight">
        وزارة العمل والتشغيل والضمان الاجتماعي
      </div>
      <div className="arabic-text text-[14px] font-bold leading-tight">
        الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء
      </div>
      <div className="text-[10px] font-bold uppercase mt-0.5 tracking-wider">
        — Assurances Sociales —
      </div>
    </div>
    <div className="w-14"></div>
  </div>
);

