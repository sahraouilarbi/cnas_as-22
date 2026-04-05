import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Printer, User, Home, Stethoscope, BriefcaseMedical, Calendar, ArrowLeft, Loader2, Info } from 'lucide-react';
import { dossiersApi, assuresApi, configApi } from '../api';
import PrintTemplate from '../components/PrintTemplate';

const FormulairePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = !!id;

  const [assuredSuggestions, setAssuredSuggestions] = useState([]);

  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm({
    defaultValues: {
      type_demande: 'soins',
      patient_lien: 'assure',
      statut: 'brouillon',
      sign_date: new Date().toISOString().split('T')[0]
    }
  });

  // Fetch Config (Establishment Info)
  const { data: config } = useQuery({
    queryKey: ['config'],
    queryFn: configApi.get
  });

  // Fetch Dossier (if edit)
  const { data: existingDossier, isLoading: isLoadingDossier } = useQuery({
    queryKey: ['dossier', id],
    queryFn: () => dossiersApi.getOne(id),
    enabled: isEdit
  });

  // Populate form with existing data
  useEffect(() => {
    if (existingDossier) {
      reset(existingDossier);
    }
  }, [existingDossier, reset]);

  // Populate with config if new dossier
  useEffect(() => {
    if (config && !isEdit) {
      setValue('etablissement_nom', config.etablissement_nom);
      setValue('etablissement_raison_sociale', config.etablissement_raison_sociale);
      setValue('convention_numero', config.convention_numero);
      setValue('convention_date_du', config.convention_date_du);
      setValue('sign_ville', config.ville_defaut);
    }
  }, [config, isEdit, setValue]);

  const formData = watch();
  const typeDemande = watch('type_demande');
  const patientLien = watch('patient_lien');
  const patientIsAssure = patientLien === 'assure';
  const assureNom = watch('assure_nom_prenom');
  const assureDateNais = watch('assure_date_naissance');
  const assureImmat = watch('assure_num_immatriculation');

  // Auto-complete logic
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (assureImmat?.length >= 3) {
        try {
          const results = await assuresApi.search(assureImmat);
          setAssuredSuggestions(results);
        } catch (e) {
          console.error('Search failed', e);
        }
      } else {
        setAssuredSuggestions([]);
      }
    };
    const timer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timer);
  }, [assureImmat]);

  const handleSelectAssured = (assured) => {
    setValue('assure_nom_prenom', assured.nom_prenom);
    setValue('assure_date_naissance', assured.date_naissance);
    setValue('assure_lieu_naissance', assured.lieu_naissance);
    setValue('assure_telephone', assured.telephone);
    setValue('assure_adresse', assured.adresse);
    setValue('assure_agence', assured.agence);
    setValue('assure_num_immatriculation', assured.num_immatriculation);
    setAssuredSuggestions([]);
  };

  useEffect(() => {
    if (patientIsAssure) {
      setValue('patient_nom', assureNom);
      setValue('patient_date_naissance', assureDateNais);
    }
  }, [patientIsAssure, assureNom, assureDateNais, setValue]);

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? dossiersApi.update(id, data) : dossiersApi.create(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries(['dossiers']);
      alert('Dossier enregistré avec succès !');
      if (!isEdit) navigate(`/edit/${res.id}`);
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isEdit && isLoadingDossier) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-slate-400">
        <Loader2 className="animate-spin mb-2" size={32} />
        <p>Chargement du dossier...</p>
      </div>
    );
  }

  return (
    <>
      <PrintTemplate data={formData} />
      
      <div className="max-w-4xl mx-auto space-y-8 no-print pb-20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {isEdit && (
              <button onClick={() => navigate('/historique')} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <ArrowLeft size={20} className="text-slate-500" />
              </button>
            )}
            <h1 className="text-2xl font-bold text-slate-800">
              {isEdit ? 'Modification du dossier' : 'Nouveau Engagement de Prise en Charge'}
            </h1>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={handleSubmit(onSubmit)} 
              disabled={mutation.isLoading}
              className="btn-primary flex items-center gap-2 bg-slate-600 hover:bg-slate-700 disabled:opacity-50"
            >
              {mutation.isLoading ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} 
              {isEdit ? 'Mettre à jour' : 'Sauvegarder'}
            </button>
            <button onClick={() => window.print()} className="btn-primary flex items-center gap-2">
              <Printer size={18} /> Imprimer
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* SECTION 1: INFORMATIONS ASSURÉ SOCIAL */}
          <section className="section-card relative">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <User className="text-cnas-blue" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">1. Informations Assuré Social</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 relative">
                <label className="input-label">N° d'immatriculation (15 chiffres)</label>
                <input 
                  {...register('assure_num_immatriculation', { 
                    required: true, 
                    pattern: /^\d{15}$/ 
                  })} 
                  className="input-field font-mono" 
                  maxLength={15} 
                  placeholder="000000000000000"
                  autoComplete="off"
                />
                {errors.assure_num_immatriculation && <span className="text-xs text-red-500">Doit contenir exactement 15 chiffres</span>}
                
                {/* Suggestions dropdown */}
                {assuredSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
                    {assuredSuggestions.map(a => (
                      <div 
                        key={a.id} 
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm border-b border-slate-50 last:border-0"
                        onClick={() => handleSelectAssured(a)}
                      >
                        <div className="font-bold">{a.nom_prenom}</div>
                        <div className="text-xs text-slate-500">{a.num_immatriculation}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="input-label">Nom et Prénom(s) de l'assuré(e)</label>
                <input {...register('assure_nom_prenom', { required: true })} className="input-field" placeholder="Ex: BENALI Mohamed" />
                {errors.assure_nom_prenom && <span className="text-xs text-red-500">Ce champ est obligatoire</span>}
              </div>
              <div>
                <label className="input-label">Date de naissance</label>
                <input type="date" {...register('assure_date_naissance', { required: true })} className="input-field" />
              </div>
              <div>
                <label className="input-label">Lieu de naissance</label>
                <input {...register('assure_lieu_naissance', { required: true })} className="input-field" />
              </div>
              <div>
                <label className="input-label">Agence de rattachement</label>
                <input {...register('assure_agence')} className="input-field" placeholder="Ex: Agence Ain Tedles" />
              </div>
              <div>
                <label className="input-label">N° Téléphone</label>
                <input {...register('assure_telephone')} className="input-field" placeholder="05/06/07 XXXXXXXX" />
              </div>
              <div className="md:col-span-2">
                <label className="input-label">Adresse</label>
                <textarea {...register('assure_adresse')} className="input-field" rows="2"></textarea>
              </div>
            </div>
          </section>

          {/* SECTION 2: ÉTABLISSEMENT DE SOINS & PATIENT */}
          <section className="section-card">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Home className="text-cnas-blue" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">2. Établissement de Soins & Patient</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4 border-r border-slate-100 pr-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">L'Établissement</h3>
                <div>
                  <label className="input-label">Établissement de soins (Nom)</label>
                  <input {...register('etablissement_nom')} className="input-field bg-slate-50" readOnly />
                </div>
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <label className="input-label">Convention n°</label>
                    <input {...register('convention_numero')} className="input-field bg-slate-50" readOnly />
                  </div>
                  <div className="w-1/2">
                    <label className="input-label">Date du</label>
                    <input type="date" {...register('convention_date_du')} className="input-field bg-slate-50" readOnly />
                  </div>
                </div>
                <div className="p-3 bg-blue-50 rounded-md flex items-start gap-2">
                  <Info className="text-blue-500 flex-shrink-0" size={16} />
                  <p className="text-[11px] text-blue-700">Ces informations sont modifiables dans les paramètres de l'application.</p>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-2">Le Patient</h3>
                <div>
                  <label className="input-label">Type de demande d'accord</label>
                  <div className="flex gap-4 mt-2">
                    {['hospitalisation', 'soins', 'sejour'].map(t => (
                      <label key={t} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="radio" value={t} {...register('type_demande')} className="text-cnas-blue" />
                        <span className="capitalize">{t === 'soins' ? 'Soins (Dialyse)' : t}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="input-label">Lien avec assuré</label>
                  <div className="grid grid-cols-3 gap-y-2 mt-2">
                    {['assure', 'conjoint', 'enfant', 'ascendant', 'autre'].map(lien => (
                      <label key={lien} className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                        <input type="radio" value={lien} {...register('patient_lien')} className="text-cnas-blue" />
                        <span className="capitalize">{lien === 'assure' ? 'Lui-même' : lien}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {patientLien === 'autre' && (
                  <input {...register('patient_lien_autre')} className="input-field mt-2" placeholder="Préciser le lien..." />
                )}
                <div className="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-50">
                  <div className="col-span-2">
                    <label className="input-label">Concernant M. / Mme</label>
                    <input {...register('patient_nom', { required: true })} className={`input-field ${patientIsAssure ? 'bg-slate-50' : ''}`} readOnly={patientIsAssure} />
                  </div>
                  <div className="col-span-2">
                    <label className="input-label">Né(e) le</label>
                    <input type="date" {...register('patient_date_naissance', { required: true })} className={`input-field ${patientIsAssure ? 'bg-slate-50' : ''}`} readOnly={patientIsAssure} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: CONDITIONNELLE */}
          {typeDemande === 'soins' ? (
            <section className="section-card border-l-4 border-l-cnas-blue animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <Stethoscope className="text-cnas-blue" size={20} />
                <h2 className="text-lg font-semibold text-slate-800">3. Cadre Soins (Hémodialyse)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="input-label">Nombre de séances</label>
                  <input type="number" {...register('soins_nb_seances')} className="input-field" min="1" />
                </div>
                <div>
                  <label className="input-label">Période du</label>
                  <input type="date" {...register('soins_periode_du')} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Période au</label>
                  <input type="date" {...register('soins_periode_au')} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Type de prise en charge</label>
                  <select {...register('soins_type_pec')} className="input-field">
                    <option value="initiale">Initiale</option>
                    <option value="prolongation">Prolongation</option>
                  </select>
                </div>
                <div>
                  <label className="input-label">Forfait prévu N°</label>
                  <input {...register('soins_forfait_numero')} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Type de malade</label>
                  <select {...register('soins_type_malade')} className="input-field">
                    <option value="permanent">Permanent</option>
                    <option value="temporaire">Temporaire</option>
                  </select>
                </div>
              </div>
            </section>
          ) : (
            <section className="section-card border-l-4 border-l-orange-400 animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
                <BriefcaseMedical className="text-orange-400" size={20} />
                <h2 className="text-lg font-semibold text-slate-800">3. Cadre Hospitalisation / Séjour</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="input-label">Type de chirurgie</label>
                  <select {...register('hosp_type_chirurgie')} className="input-field">
                    <option value="chirurgie">Chirurgie</option>
                    <option value="chir_cardio">Chirurgie Cardio-vasculaire</option>
                    <option value="autre">Autre</option>
                  </select>
                </div>
                {watch('hosp_type_chirurgie') === 'autre' && (
                  <div>
                    <label className="input-label">Préciser</label>
                    <input {...register('hosp_type_chirurgie_autre')} className="input-field" />
                  </div>
                )}
                <div>
                  <label className="input-label">À compter du</label>
                  <input type="date" {...register('hosp_date_debut')} className="input-field" />
                </div>
                <div>
                  <label className="input-label">Durée prévue (jours)</label>
                  <input type="number" {...register('hosp_duree_jours')} className="input-field" min="1" />
                </div>
                <div className="md:col-span-2">
                  <label className="input-label">Actes prévus</label>
                  <textarea {...register('hosp_actes_prevus')} className="input-field" rows="3"></textarea>
                </div>
              </div>
            </section>
          )}

          {/* SECTION 4: SIGNATURE */}
          <section className="section-card">
            <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
              <Calendar className="text-cnas-blue" size={20} />
              <h2 className="text-lg font-semibold text-slate-800">4. Signature & Administration</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="input-label">Fait à</label>
                <input {...register('sign_ville')} className="input-field" placeholder="Ex: Ain Tedles" />
              </div>
              <div>
                <label className="input-label">Le</label>
                <input type="date" {...register('sign_date')} className="input-field" />
              </div>
            </div>
          </section>

          <div className="flex justify-end gap-4 mt-10">
            <button 
              type="button" 
              onClick={() => navigate('/historique')}
              className="px-6 py-2 text-slate-600 font-medium hover:text-slate-800 transition-colors"
            >
              Annuler
            </button>
            <button type="submit" disabled={mutation.isLoading} className="btn-primary px-10">
              {mutation.isLoading && <Loader2 size={18} className="animate-spin mr-2" />}
              {isEdit ? 'Mettre à jour' : 'Enregistrer'}
            </button>
          </div>

        </form>
      </div>
    </>
  );
};

export default FormulairePage;
