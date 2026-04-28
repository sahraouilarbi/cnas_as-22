import { BlueHeader } from "../components/PT_BlueHeader";
import { SectionAssure } from "../components/PT_SectionAssure";
import { SectionCaisse } from "../components/PT_SectionCaisse";
import { SectionEtablissement } from "../components/PT_SectionEtablissement";
import { SectionImportant } from "../components/PT_SectionImportant";
import { TechnicalFooter } from "../components/PT_TechnicalFooter";
import { VisaTitle } from "../components/PT_VisaTitle";

/**
 * Main PrintTemplate Component
 */
const PrintTemplate = ({ data }) => {
  if (!data) return null;

  const isHosp = data.type_demande === "hospitalisation";
  const isSoins = data.type_demande === "soins";
  const isSejour = data.type_demande === "sejour";

  return (
    <>
      <div
        id="cnas-print-form"
        className="hidden print:block bg-white text-[14px] font-serif leading-[1.2] text-black p-0 m-0 w-[198mm] relative overflow-hidden"
      >
        <style>
          {`
          @page {
            size: A4 portrait;
            margin: 0 ! important;
            padding: 0 ! important;
          }
          @media print {
            body { background: white; -webkit-print-color-adjust: exact; margin: 0!important; padding: 0!important; overflow: hidden;}
            #cnas-print-form {
              background-color: white ! important;
              display: block !important;
              box-sizing: border-box;
              // padding: 5mm 9mm;
              padding-left:5mm;
              padding-right:5mm;
              height: 279mm;
              transform: scale(1);
              transform-origin: top center;
              font-family: Arial, sans-serif;
            }
            .no-print { display: none !important; }
          }
          .margin-between-sections { margin-bottom: 20px; }
          .official-border { border: 1.2px solid black; }
          .arabic-text { font-family: "Amiri", "Times New Roman", serif; direction: rtl; }
          .cnas-bg-blue { background-color: #0069b4 !important; color: white !important; }
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
      </div>
      <TechnicalFooter dateImp={"11-2022"} numImp={"AS.22"} />
    </>
  );
};

export default PrintTemplate;
