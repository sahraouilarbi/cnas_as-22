import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Building2, Globe, Database, Loader2, CheckCircle } from 'lucide-react';
import { configApi } from '../api';

const Parametres = () => {
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: config, isLoading } = useQuery({
    queryKey: ['config'],
    queryFn: configApi.get
  });

  useEffect(() => {
    if (config) {
      reset(config);
    }
  }, [config, reset]);

  const mutation = useMutation({
    mutationFn: (data) => configApi.update(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['config']);
      alert('Paramètres enregistrés !');
    }
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  if (isLoading) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-cnas-blue" size={32} /></div>;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-2xl font-bold text-slate-800">Paramètres de l'application</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        
        <section className="section-card">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <Building2 className="text-cnas-blue" size={20} />
            <h2 className="text-lg font-semibold text-slate-800">Établissement par défaut</h2>
          </div>
          <p className="text-sm text-slate-500 mb-6">Ces informations seront pré-remplies sur chaque nouveau formulaire.</p>
          
          <div className="space-y-4">
            <div>
              <label className="input-label">Nom de l'établissement</label>
              <input {...register('etablissement_nom')} className="input-field" placeholder="Ex: Centre d'Hémodialyse Aïn Tedles" />
            </div>
            <div>
              <label className="input-label">Raison sociale</label>
              <input {...register('etablissement_raison_sociale')} className="input-field" placeholder="Ex: SARL HEMODIALYSE" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="input-label">Convention n°</label>
                <input {...register('convention_numero')} className="input-field" />
              </div>
              <div>
                <label className="input-label">Date de convention (Du)</label>
                <input type="date" {...register('convention_date_du')} className="input-field" />
              </div>
            </div>
            <div>
              <label className="input-label">Ville (Fait à)</label>
              <input {...register('ville_defaut')} className="input-field" placeholder="Ex: Ain Tedles" />
            </div>
          </div>
        </section>

        <section className="section-card">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-2">
            <Globe className="text-cnas-blue" size={20} />
            <h2 className="text-lg font-semibold text-slate-800">Préférences</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="input-label">Langue de l'interface</label>
              <select {...register('langue')} className="input-field">
                <option value="fr">Français</option>
                <option value="ar">العربية (Prochainement)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" {...register('sauvegarde_auto')} id="auto_save" className="text-cnas-blue rounded" />
              <label htmlFor="auto_save" className="text-sm text-slate-700 cursor-pointer">Sauvegarde automatique à l'impression</label>
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <button type="submit" disabled={mutation.isPending} className="btn-primary px-10 flex items-center gap-2">
            {mutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Enregistrer les modifications
          </button>
        </div>

      </form>
      
      <div className="bg-slate-100 p-4 rounded-lg flex items-start gap-3">
        <Database className="text-slate-400 mt-1" size={20} />
        <div>
          <h3 className="text-sm font-bold text-slate-700">Base de données locale</h3>
          <p className="text-xs text-slate-500 mt-1">Vos données sont stockées en toute sécurité sur ce PC uniquement.</p>
          <div className="mt-2 text-[10px] text-slate-400 font-mono">
            Chemin : data/database.sqlite
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parametres;
