import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Search, Edit, Trash2, Loader2 } from 'lucide-react';
import { dossiersApi } from '../api';

const Historique = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const queryClient = useQueryClient();

  const { data: dossiers, isLoading, error } = useQuery({
    queryKey: ['dossiers', searchTerm],
    queryFn: () => dossiersApi.getAll(searchTerm)
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => dossiersApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dossiers'] });
    }
  });

  const handleDelete = (id, name) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer le dossier de "${name}" ?`)) {
      deleteMutation.mutate(id);
    }
  };

  if (error) return <div className="text-red-500 p-8 bg-red-50 rounded-lg border border-red-200">Erreur lors du chargement des dossiers. Vérifiez que le serveur est bien lancé.</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-800">Historique des Dossiers</h1>
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Rechercher par nom ou matricule..."
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} className="absolute left-3 top-2.5 text-slate-400" />
        </div>
      </div>

      <div className="bg-white shadow-sm border border-slate-200 rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Assuré</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Matricule</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Statut</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400">
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Chargement des dossiers...
                  </div>
                </td>
              </tr>
            ) : dossiers?.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-slate-400">Aucun dossier trouvé.</td>
              </tr>
            ) : (
              dossiers.map((d) => (
                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(d.created_at).toLocaleDateString('fr-FR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                    {d.assure_nom_prenom}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 font-mono">
                    {d.assure_num_immatriculation}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                      d.type_demande === 'soins' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {d.type_demande === 'soins' ? 'Hémodialyse' : d.type_demande}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`text-xs ${d.statut === 'imprime' ? 'text-green-600' : 'text-amber-600'}`}>
                      {d.statut === 'imprime' ? 'Imprimé' : 'Brouillon'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                    <Link to={`/edit/${d.id}`} className="text-cnas-blue hover:text-cnas-dark" title="Voir / Modifier">
                      <Edit size={18} className="inline" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(d.id, d.assure_nom_prenom)}
                      disabled={deleteMutation.isPending}
                      className="text-red-600 hover:text-red-900 disabled:opacity-30" title="Supprimer"
                    >
                      <Trash2 size={18} className="inline" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Historique;
