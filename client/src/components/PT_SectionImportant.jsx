import { FloatingTitle } from "./FloatingTitle";

/**
 * Section 4: Important
 */
export const SectionImportant = () => (
  <div className="relative official-border pt-4 px-1">
    <FloatingTitle title="IMPORTANT" isUnderline={true} />
    <div className="overflow-hidden">
      <ul className="text-[9px] space-y-0.5 list-disc pl-4 italic leading-normal">
        <li>
          Le montant sera réglé par la caisse sur présentation de l'original de
          la prise en charge compostée, d'un compte rendu médical, d'un
          protocole opératoire, d'un bulletin de séjour, des stickers, factures
          et numéros de série des consommables et/ou des dispositifs médicaux
          utilisés, des vignettes des tampons ainsi que la facture de
          l'établissement en trois (03) exemplaires.
        </li>
        <li>
          Toute demande de prolongation doit être adressée à la caisse avant
          l'expiration de la prise en charge initiale.
        </li>
      </ul>
    </div>
  </div>
);
