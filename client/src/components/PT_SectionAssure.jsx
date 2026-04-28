import { DottedField } from "./DottedField";
import { formatDate } from "../utils/dateUtils";

/**
 * Section 1: Assuré Social
 */
export const SectionAssure = ({ data }) => (
  <div className="official-border p-2 margin-between-sections space-y-1">
    <DottedField
      label="Nom et Prénom(s) de l'assuré(e) social(e) :"
      value={data.assure_nom_prenom}
    />
    <div className="flex gap-4">
      <DottedField
        label="Date et lieu de naissance :"
        value={`${formatDate(data.assure_date_naissance)} à ${data.assure_lieu_naissance || ""}`.replace(
          /^ à $/,
          "",
        )}
        className="flex-grow"
      />
      <DottedField
        label="N° tél. :"
        value={data.assure_telephone}
        className="w-36"
      />
    </div>
    <DottedField label="Adresse :" value={data.assure_adresse} />
    <DottedField label="Agence de rattachement :" value={data.assure_agence} />
    <div className="flex items-center gap-4 pt-0.5 px-25">
      <span className="font-bold">N° d'immatriculation :</span>
      <div className="border border-black h-8 flex-grow flex items-center px-4 tracking-[0.5em] font-mono text-base font-black bg-white shadow-inner">
        {data.assure_num_immatriculation}
      </div>
    </div>
  </div>
);
