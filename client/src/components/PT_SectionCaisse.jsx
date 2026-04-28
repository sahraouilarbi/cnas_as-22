import { DottedField } from "./DottedField";
import { formatDate } from "../utils/dateUtils";
import { FloatingTitle } from "./FloatingTitle";

/**
 * Section 3: Administration de la Caisse
 */
export const SectionCaisse = ({ data }) => (
  <div className="relative official-border margin-between-sections pt-4 px-1">
    <FloatingTitle
      title="CADRE RÉSERVÉ A L'ADMINISTRATION DE LA CAISSE"
      isUnderline={false}
    />
    <div className="overflow-hidden">
      <div className="p-2 space-y-1 min-h-[110px]">
        <DottedField
          label="La caisse s'engage à régler à l'établissement, ci-dessus désigné, les frais de :"
          value={data.caisse_frais}
        />
        <div className="flex gap-2">
          <span>Au taux de</span>
          <span className="border-b border-dotted border-black w-16 text-center font-bold">
            {data.caisse_taux || ".........."}
          </span>
          <span>
            % dans la limite des tarifs conventionnels pour les actes indiqués
            ci-après :
          </span>
        </div>
        <DottedField label="Actes :" value={data.caisse_actes} />
        <div className="flex gap-4">
          <DottedField
            label="En hémodialyse : le forfait accordé N° :"
            value={data.caisse_forfait_hemodialyse}
            className="flex-grow"
          />
        </div>
        <div className="flex gap-4">
          <DottedField
            label="Pour la période du :"
            value={formatDate(data.caisse_periode_du)}
            className="w-56"
          />
          <DottedField
            label="au :"
            value={formatDate(data.caisse_periode_au)}
            className="w-56"
          />
          <DottedField
            label="Nombre de séances :"
            value={data.caisse_nb_seances}
            className="flex-grow"
          />
        </div>

        <div className="flex justify-between items-start mt-2">
          <div className="official-border p-1.5 w-60 text-center border-dashed">
            <div className="font-bold underline text-[8px] mb-1 uppercase">
              Validité de la prise en charge
            </div>
            <div className="flex justify-around items-center gap-1">
              <DottedField
                label="DU"
                value={formatDate(data.validite_du)}
                className="w-22"
              />
              <DottedField
                label="AU"
                value={formatDate(data.validite_au)}
                className="w-22"
              />
            </div>
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <div className="flex gap-1 items-baseline">
              <span>Fait à</span>
              <span className="border-b border-dotted border-black w-28 px-1 font-bold text-center">
                {data.caisse_fait_a}
              </span>
              <span>le</span>
              <span className="border-b border-dotted border-black w-28 px-1 font-bold text-center">
                {formatDate(data.caisse_fait_le)}
              </span>
            </div>
            <div className="text-[9px] font-bold uppercase w-full text-center">
              Cachet et Signature
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
