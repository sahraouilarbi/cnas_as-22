/**
 * Section: Blue Header (CNAS Branding)
 */

export const BlueHeader = () => (
  <div className="cnas-bg-blue margin-between-sections flex justify-between items-center">
    <div className="w-20 h-20"></div>
    <div className="bg-white p-1 rounded-full w-20 h-20 flex items-center justify-center">
      <img src="./img/cnas_logo.png" alt="CNAS" className="w-18" />
    </div>
    <div className="text-center flex-grow">
      <div className="arabic-text text-[17px] font-bold leading-normal">
        وزارة العمل والتشغيل والضمان الاجتماعي
      </div>
      <div className="arabic-text text-[22px] font-bold leading-widest">
        الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء
      </div>
      <div className="text-[11px] font-bold uppercase mt-0.5 tracking-wider">
        — Assurances Sociales —
      </div>
    </div>
  </div>
);
