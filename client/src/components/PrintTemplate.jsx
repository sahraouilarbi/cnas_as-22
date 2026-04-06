import React from "react";

/**
 * PrintTemplate - Reproduit fidèlement le formulaire officiel CNAS (IMF CNAS 11-2022 - AS.22)
 * Ajusté pour tenir sur une seule page A4 et inclure l'en-tête bleu.
 */
const PrintTemplate = ({ data }) => {
  if (!data) return null;

  const isHosp = data.type_demande === "hospitalisation";
  const isSoins = data.type_demande === "soins";
  const isSejour = data.type_demande === "sejour";

  const CheckBox = ({ checked }) => (
    <span className="inline-block w-3.5 h-3.5 border border-black mr-1 relative align-middle bg-white flex-shrink-0">
      {checked && (
        <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold leading-none">
          X
        </span>
      )}
    </span>
  );

  const DottedField = ({ label, value, className = "" }) => {
    return (
      <div className={`flex items-baseline gap-1 ${className}`}>
        {label && <span className="whitespace-nowrap">{label}</span>}
        <span className="border-b border-dotted border-black flex-grow min-h-[1.2em] px-1 font-bold text-[11px] overflow-hidden whitespace-nowrap text-ellipsis">
          {value || ""}
        </span>
      </div>
    );
  };

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
              transform: scale(0.98); /* Léger dézoom global pour garantir le non-débordement */
              transform-origin: top center;
            }
            .no-print { display: none !important; }
          }
          .official-border { border: 1.2px solid black; }
          .arabic-text { font-family: "Amiri", "Times New Roman", serif; direction: rtl; }
          .cnas-bg-blue { background-color: #2563eb !important; color: white !important; }
        `}
      </style>

      {/* EN-TETE BLEU (Inspiré de AS-11.pdf) */}
      <div className="cnas-bg-blue p-2 mb-2 flex justify-between items-center rounded-sm">
        <div className="bg-white p-1 rounded-full w-14 h-14 flex items-center justify-center">
          <img src="/img/cnas_logo.png" alt="CNAS" className="w-12" />
        </div>
        <div className="text-center flex-grow">
          <div className="arabic-text text-[11px] font-bold leading-tight">
            وزارة العمل والتشغيل والضمان الاجتماعي
          </div>
          <div className="arabic-text text-[12px] font-bold leading-tight">
            الصندوق الوطني للتأمينات الاجتماعية للعمال الأجراء
          </div>
          <div className="text-[10px] font-bold uppercase mt-0.5 tracking-wider">
            — Assurances Sociales —
          </div>
        </div>
        <div className="w-14"></div>
      </div>

      {/* VISA ET TITRE PRINCIPAL */}
      <div className="flex gap-4 mb-2 items-stretch h-20">
        <div className="w-[30%] official-border p-1 relative flex flex-col justify-end text-center rounded-sm">
          <div className="text-[8px] italic border-t border-black pt-0.5 w-full">
            Visa de la Structure
          </div>
        </div>
        <div className="w-[70%] text-center flex flex-col justify-center">
          <h1 className="text-[16px] font-black uppercase tracking-tight leading-none mb-1">
            ENGAGEMENT DE PRISE EN CHARGE
            <br />
            POUR ETABLISSEMENT CONVENTIONNE
          </h1>
        </div>
      </div>

      {/* SECTION 1: ASSURE SOCIAL */}
      <div className="official-border p-2 mb-2 space-y-1">
        <DottedField
          label="Nom et Prénom(s) de l'assuré(e) social(e) :"
          value={data.assure_nom_prenom}
        />
        <div className="flex gap-4">
          <DottedField
            label="Date et lieu de naissance :"
            value={`${data.assure_date_naissance || ""} à ${data.assure_lieu_naissance || ""}`}
            className="flex-grow"
          />
          <DottedField
            label="N° tél. :"
            value={data.assure_telephone}
            className="w-36"
          />
        </div>
        <DottedField label="Adresse :" value={data.assure_adresse} />
        <DottedField
          label="Agence de rattachement :"
          value={data.assure_agence}
        />
        <div className="flex items-center gap-4 pt-0.5">
          <span className="font-bold">N° d'immatriculation :</span>
          <div className="border border-black h-8 flex-grow flex items-center px-4 tracking-[0.5em] font-mono text-base font-black bg-white shadow-inner">
            {data.assure_num_immatriculation}
          </div>
        </div>
      </div>

      {/* SECTION 2: CADRE ETABLISSEMENT (CADRE PRINCIPAL) */}
      <div className="official-border p-0 mb-2 overflow-hidden">
        <div className="text-center font-bold border-b border-black py-0.5 uppercase tracking-widest text-[9px] bg-slate-50">
          CADRE RÉSERVÉ A L'ÉTABLISSEMENT DE SOINS
        </div>

        <div className="p-2 space-y-1">
          <DottedField
            label="L'établissement de soins :"
            value={data.etablissement_nom}
          />
          <DottedField
            label="Raison sociale :"
            value={data.etablissement_raison_sociale}
          />
          <div className="flex gap-10">
            <DottedField
              label="Convention n° :"
              value={data.convention_numero}
              className="flex-grow"
            />
            <DottedField
              label="Du"
              value={data.convention_date_du}
              className="w-40"
            />
          </div>

          <div className="flex items-center gap-6 py-0.5">
            <span className="font-bold">
              Demande l'accord de la caisse pour :
            </span>
            <div className="flex gap-6">
              <label className="flex items-center cursor-default">
                <CheckBox checked={isHosp} /> Hospitalisation
              </label>
              <label className="flex items-center cursor-default">
                <CheckBox checked={isSoins} /> Soins
              </label>
              <label className="flex items-center cursor-default">
                <CheckBox checked={isSejour} /> Séjour <sup>(1)</sup>
              </label>
            </div>
          </div>

          <div className="flex gap-4">
            <DottedField
              label="Concernant M. :"
              value={data.patient_nom}
              className="flex-grow"
            />
            <DottedField
              label="Né(e) le :"
              value={data.patient_date_naissance}
              className="w-40"
            />
          </div>

          <div className="flex gap-4 items-center text-[9px] leading-none">
            <span>(1)</span>
            <label className="flex items-center">
              <CheckBox checked={data.patient_lien === "assure"} /> Assuré(e)
            </label>
            <label className="flex items-center">
              <CheckBox checked={data.patient_lien === "conjoint"} /> Conjoint
            </label>
            <label className="flex items-center">
              <CheckBox checked={data.patient_lien === "enfant"} /> Enfant
            </label>
            <label className="flex items-center">
              <CheckBox checked={data.patient_lien === "ascendant"} /> Ascendant
            </label>
            <label className="flex items-center">
              <CheckBox checked={data.patient_lien === "autre"} /> Autre
            </label>
            <DottedField
              label="à préciser :"
              value={
                data.patient_lien === "autre" ? data.patient_lien_autre : ""
              }
              className="flex-grow"
            />
          </div>

          {/* SOUS-SECTION HOSPITALISATION */}
          <div className="mt-1 pt-1 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full border border-black inline-block flex-shrink-0"></span>
              <span className="font-bold uppercase text-[9px]">
                HOSPITALISATION :
              </span>
            </div>
            <div className="pl-4 space-y-0.5">
              <div className="flex gap-4 items-center">
                <span className="text-[9px]">(1)</span>
                <label className="flex items-center">
                  <CheckBox
                    checked={isHosp && data.hosp_type_chirurgie === "chirurgie"}
                  />{" "}
                  Chirurgie
                </label>
                <label className="flex items-center">
                  <CheckBox
                    checked={
                      isHosp && data.hosp_type_chirurgie === "chir_cardio"
                    }
                  />{" "}
                  Chirurgie cardio-vasculaire
                </label>
                <label className="flex items-center">
                  <CheckBox
                    checked={isHosp && data.hosp_type_chirurgie === "autre"}
                  />{" "}
                  Autre :
                </label>
                <DottedField
                  label=""
                  value={
                    isHosp && data.hosp_type_chirurgie === "autre"
                      ? data.hosp_type_chirurgie_autre
                      : ""
                  }
                  className="flex-grow"
                />
              </div>
              <div className="flex gap-3 items-center">
                <DottedField
                  label="à compter du :"
                  value={isHosp || isSejour ? data.hosp_date_debut : ""}
                  className="w-40"
                />
                <span className="mx-1">pour :</span>
                <label className="flex items-center">
                  <CheckBox
                    checked={
                      (isHosp || isSejour) &&
                      data.hosp_type_sejour === "initial"
                    }
                  />{" "}
                  Séjour initial
                </label>
                <label className="flex items-center">
                  <CheckBox
                    checked={
                      (isHosp || isSejour) &&
                      data.hosp_type_sejour === "prolongation"
                    }
                  />{" "}
                  Prolongation <sup>(1)</sup>
                </label>
                <DottedField
                  label="Pour une durée de :"
                  value={isHosp || isSejour ? data.hosp_duree_jours : ""}
                  className="w-20"
                />
                <span>jours.</span>
              </div>
              <DottedField
                label="Actes prévus :"
                value={isHosp || isSejour ? data.hosp_actes_prevus : ""}
              />
            </div>
          </div>

          {/* SOUS-SECTION SOINS / HEMODIALYSE */}
          <div className="mt-1 pt-1 border-t border-slate-200">
            <div className="flex items-center gap-2 mb-0.5">
              <span className="w-2 h-2 rounded-full border border-black inline-block flex-shrink-0"></span>
              <span className="font-bold uppercase text-[9px]">SOINS</span>
            </div>
            <div className="pl-4 space-y-0.5">
              <div className="flex gap-4">
                <DottedField
                  label="Hémodialyse : nombre de séances"
                  value={isSoins ? data.soins_nb_seances : ""}
                  className="flex-grow"
                />
                <DottedField
                  label="Du"
                  value={isSoins ? data.soins_periode_du : ""}
                  className="w-32"
                />
                <DottedField
                  label="Au"
                  value={isSoins ? data.soins_periode_au : ""}
                  className="w-32"
                />
              </div>
              <div className="flex gap-6 items-center">
                <div className="flex gap-3 items-center">
                  <span className="text-[9px]">(1)</span>
                  <span className="font-bold">Prise en charge :</span>
                  <label className="flex items-center">
                    <CheckBox
                      checked={isSoins && data.soins_type_pec === "initiale"}
                    />{" "}
                    Initiale
                  </label>
                  <label className="flex items-center">
                    <CheckBox
                      checked={
                        isSoins && data.soins_type_pec === "prolongation"
                      }
                    />{" "}
                    Prolongation
                  </label>
                </div>
                <DottedField
                  label="forfait prévu N° :"
                  value={isSoins ? data.soins_forfait_numero : ""}
                  className="flex-grow"
                />
              </div>
              <div className="flex justify-between items-end pt-1">
                <div className="space-y-1">
                  <div className="font-bold text-[9px]">
                    Malade pris en charge au niveau du centre de dialyse en tant
                    que : <sup>(1)</sup>
                  </div>
                  <div className="flex gap-8 pl-4">
                    <label className="flex items-center">
                      <CheckBox
                        checked={
                          isSoins && data.soins_type_malade === "permanent"
                        }
                      />{" "}
                      Permanent
                    </label>
                    <label className="flex items-center">
                      <CheckBox
                        checked={
                          isSoins && data.soins_type_malade === "temporaire"
                        }
                      />{" "}
                      Temporaire
                    </label>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <div className="flex gap-1 items-baseline">
                    <span>Fait à</span>
                    <span className="border-b border-dotted border-black w-28 px-1 font-bold text-center">
                      {data.sign_ville}
                    </span>
                    <span>le</span>
                    <span className="border-b border-dotted border-black w-28 px-1 font-bold text-center">
                      {data.sign_date}
                    </span>
                  </div>
                  <div className="text-[8px] font-bold mt-1 uppercase w-full text-center">
                    Cachet et signature
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-[8px] mt-1">
            (1) Mettre une croix (X) dans la case correspondante.
          </div>
        </div>
      </div>

      {/* SECTION 3: ADMINISTRATION DE LA CAISSE */}
      <div className="official-border p-0 mb-2 overflow-hidden">
        <div className="text-center font-bold border-b border-black py-0.5 uppercase tracking-widest text-[9px] bg-slate-50">
          CADRE RÉSERVÉ A L'ADMINISTRATION DE LA CAISSE
        </div>
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
              value={data.caisse_periode_du}
              className="w-56"
            />
            <DottedField
              label="au :"
              value={data.caisse_periode_au}
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
                  value={data.validite_du}
                  className="w-22"
                />
                <DottedField
                  label="AU"
                  value={data.validite_au}
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
                  {data.caisse_fait_le}
                </span>
              </div>
              <div className="text-[9px] font-bold uppercase w-full text-center">
                Cachet et Signature
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION 4: IMPORTANT */}
      <div className="mt-1 border-t border-black pt-1">
        <h3 className="text-center font-black text-[11px] uppercase tracking-widest mb-1 leading-none">
          IMPORTANT
        </h3>
        <ul className="text-[8px] space-y-0.5 list-disc pl-4 italic leading-tight">
          <li>
            Le montant sera réglé par la caisse sur présentation de l'original
            de la prise en charge compostée, d'un compte rendu médical, d'un
            protocole opératoire, d'un bulletin de séjour, des stickers,
            factures et numéros de série des consommables et/ou des dispositifs
            médicaux utilisés, des vignettes des tampons ainsi que la facture de
            l'établissement en trois (03) exemplaires.
          </li>
          <li>
            Toute demande de prolongation doit être adressée à la caisse avant
            l'expiration de la prise en charge initiale.
          </li>
        </ul>
      </div>

      {/* PIED DE PAGE TECHNIQUE (Rotation 90°) */}
      <div className="absolute right-2 bottom-24 rotate-[-90deg] origin-right text-[6px] text-gray-500 font-sans uppercase tracking-tighter bg-red-400">
        IMP CNAS 11-2022 - AS.22
      </div>
    </div>
  );
};

export default PrintTemplate;
