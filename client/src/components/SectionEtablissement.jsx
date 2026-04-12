import { CheckBox } from "./CheckBox";
import { DottedField } from "./DottedField";

/**
 * Section 2: Cadre Etablissement de Soins
 */
export const SectionEtablissement = ({ data, isHosp, isSoins, isSejour }) => (
    <div className="official-border p-0 mb-2 overflow-hidden">
        <div className="text-center font-bold border-b border-black py-0.5 uppercase tracking-widest text-[9px] bg-slate-50">
            CADRE RÉSERVÉ A L'ÉTABLISSEMENT DE SOINS
        </div>

        <div className="p-2 space-y-1">
            <DottedField
                label="L'établissement de soins :"
                value={data.etablissement_nom} />
            <DottedField
                label="Raison sociale :"
                value={data.etablissement_raison_sociale} />
            <div className="flex gap-10">
                <DottedField
                    label="Convention n° :"
                    value={data.convention_numero}
                    className="flex-grow" />
                <DottedField
                    label="Du"
                    value={data.convention_date_du}
                    className="w-40" />
            </div>

            <div className="flex items-center gap-6 py-0.5">
                <span className="font-bold">Demande l'accord de la caisse pour :</span>
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
                    className="flex-grow" />
                <DottedField
                    label="Né(e) le :"
                    value={data.patient_date_naissance}
                    className="w-40" />
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
                    value={data.patient_lien === "autre" ? data.patient_lien_autre : ""}
                    className="flex-grow" />
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
                                checked={isHosp && data.hosp_type_chirurgie === "chirurgie"} />{" "}
                            Chirurgie
                        </label>
                        <label className="flex items-center">
                            <CheckBox
                                checked={isHosp && data.hosp_type_chirurgie === "chir_cardio"} />{" "}
                            Chirurgie cardio-vasculaire
                        </label>
                        <label className="flex items-center">
                            <CheckBox
                                checked={isHosp && data.hosp_type_chirurgie === "autre"} />{" "}
                            Autre :
                        </label>
                        <DottedField
                            label=""
                            value={isHosp && data.hosp_type_chirurgie === "autre"
                                ? data.hosp_type_chirurgie_autre
                                : ""}
                            className="flex-grow" />
                    </div>
                    <div className="flex gap-3 items-center">
                        <DottedField
                            label="à compter du :"
                            value={isHosp || isSejour ? data.hosp_date_debut : ""}
                            className="w-40" />
                        <span className="mx-1">pour :</span>
                        <label className="flex items-center">
                            <CheckBox
                                checked={(isHosp || isSejour) && data.hosp_type_sejour === "initial"} />{" "}
                            Séjour initial
                        </label>
                        <label className="flex items-center">
                            <CheckBox
                                checked={(isHosp || isSejour) &&
                                    data.hosp_type_sejour === "prolongation"} />{" "}
                            Prolongation <sup>(1)</sup>
                        </label>
                        <DottedField
                            label="Pour une durée de :"
                            value={isHosp || isSejour ? data.hosp_duree_jours : ""}
                            className="w-20" />
                        <span>jours.</span>
                    </div>
                    <DottedField
                        label="Actes prévus :"
                        value={isHosp || isSejour ? data.hosp_actes_prevus : ""} />
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
                            className="flex-grow" />
                        <DottedField
                            label="Du"
                            value={isSoins ? data.soins_periode_du : ""}
                            className="w-32" />
                        <DottedField
                            label="Au"
                            value={isSoins ? data.soins_periode_au : ""}
                            className="w-32" />
                    </div>
                    <div className="flex gap-6 items-center">
                        <div className="flex gap-3 items-center">
                            <span className="text-[9px]">(1)</span>
                            <span className="font-bold">Prise en charge :</span>
                            <label className="flex items-center">
                                <CheckBox
                                    checked={isSoins && data.soins_type_pec === "initiale"} />{" "}
                                Initiale
                            </label>
                            <label className="flex items-center">
                                <CheckBox
                                    checked={isSoins && data.soins_type_pec === "prolongation"} />{" "}
                                Prolongation
                            </label>
                        </div>
                        <DottedField
                            label="forfait prévu N° :"
                            value={isSoins ? data.soins_forfait_numero : ""}
                            className="flex-grow" />
                    </div>
                    <div className="flex justify-between items-end pt-1">
                        <div className="space-y-1">
                            <div className="font-bold text-[9px]">
                                Malade pris en charge au niveau du centre de dialyse en tant que
                                : <sup>(1)</sup>
                            </div>
                            <div className="flex gap-8 pl-4">
                                <label className="flex items-center">
                                    <CheckBox
                                        checked={isSoins && data.soins_type_malade === "permanent"} />{" "}
                                    Permanent
                                </label>
                                <label className="flex items-center">
                                    <CheckBox
                                        checked={isSoins && data.soins_type_malade === "temporaire"} />{" "}
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
);
