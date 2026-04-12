import { BlueHeader } from "./BlueHeader";
import { SectionAssure } from "./SectionAssure";
import { SectionCaisse } from "./SectionCaisse";
import { SectionEtablissement } from "./SectionEtablissement";
import { SectionImportant } from "./SectionImportant";
import { TechnicalFooter } from "./TechnicalFooter";
import { VisaTitle } from "./VisaTitle";

/**
 * Main PrintTemplate Component
 */
const PrintTemplate = ({ data }) => {
  if (!data) return null;

  const isHosp = data.type_demande === "hospitalisation";
  const isSoins = data.type_demande === "soins";
  const isSejour = data.type_demande === "sejour";

  return (
    <div
      id="cnas-print-form"
      className="hidden print:block bg-white text-[10px] font-serif leading-[1.2] text-black p-0 m-0 w-[210mm] relative overflow-hidden"
    >
      <style>
        {`
          @page {
            size: A4 portrait;
            margin: 0;
          }
          @media print {
            body { background: white; -webkit-print-color-adjust: exact; margin: 0; padding: 0; overflow: hidden; }
            #cnas-print-form {
              display: block !important;
              padding: 5mm 12mm;
              height: 290mm;
              box-sizing: border-box;
              transform: scale(0.98);
              transform-origin: top center;
            }
            .no-print { display: none !important; }
          }
          .official-border { border: 1.2px solid black; }
          .arabic-text { font-family: "Amiri", "Times New Roman", serif; direction: rtl; }
          .cnas-bg-blue { background-color: #2563eb !important; color: white !important; }
        `}
      </style>

      <BlueHeader />
      <VisaTitle />
      <SectionAssure data={data} />
      <SectionEtablissement
        data={data}
        isHosp={isHosp}
        isSoins={isSoins}
        isSejour={isSejour}
      />
      <SectionCaisse data={data} />
      <SectionImportant />
      <TechnicalFooter dateImp={"11-2022"} numImp={"AS.22"} />
    </div>
  );
};

export default PrintTemplate;
