import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchAnimals, createAnimal, addToOfflineQueue } from '../../store/slices/animalsSlice';
import { offlineQueue } from '../../services/offlineQueue';
import { Plus, Search, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

interface AnimalFormData {
  name: string;
  species: string;
  breed: string;
  birthDate: string;
  gender: string;
  notes: string;
}

const AnimalsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { animals, loading } = useAppSelector(state => state.animals);
  const { isOnline } = useAppSelector(state => state.sync);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState<AnimalFormData>({
    name: '',
    species: '',
    breed: '',
    birthDate: '',
    gender: 'female',
    notes: '',
  });

  useEffect(() => {
    dispatch(fetchAnimals());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.species || !formData.breed || !formData.birthDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      if (isOnline) {
        // Try to save directly when online
        await dispatch(createAnimal({
          ...formData,
          status: 'active',
        })).unwrap();
        toast.success('Animal added successfully');
      } else {
        // Add to offline queue when offline
        const tempId = `temp_${Date.now()}`;
        const animalData = {
          id: tempId,
          ...formData,
          status: 'active',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          tempId,
        };
        
        dispatch(addToOfflineQueue(animalData));
        
        // Queue for sync
        offlineQueue.queueOperation({
          type: 'CREATE',
          entity: 'animals',
          data: formData,
          tempId,
        });
        
        toast.success('Animal queued for sync when online');
      }
      
      // Reset form
      setFormData({
        name: '',
        species: '',
        breed: '',
        birthDate: '',
        gender: 'female',
        notes: '',
      });
      setShowAddForm(false);
    } catch (error) {
      toast.error('Failed to add animal');
    }
  };

  const filteredAnimals = animals.filter(animal =>
    animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.species.toLowerCase().includes(searchTerm.toLowerCase()) ||
    animal.breed.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && animals.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">{t('common.loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('animals.title')}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your livestock inventory
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn btn-primary px-4 py-2 flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>{t('animals.addAnimal')}</span>
        </button>
      </div>

      {/* Search and filters */}
      <div className="flex space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
        </div>
        <button className="btn btn-secondary px-4 py-2 flex items-center space-x-2">
          <Filter className="h-4 w-4" />
          <span>{t('common.filter')}</span>
        </button>
      </div>

      {/* Add animal form */}
      {showAddForm && (
        <div className="card p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            {t('animals.addAnimal')}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('common.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('animals.species')} *
                </label>
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="e.g., Cattle, Pig, Sheep"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('animals.breed')} *
                </label>
                <input
                  type="text"
                  name="breed"
                  value={formData.breed}
                  onChange={handleInputChange}
                  className="input"
                  placeholder="e.g., Holstein, Yorkshire"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('animals.birthDate')} *
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('animals.gender')} *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="input"
                  required
                >
                  <option value="female">{t('animals.female')}</option>
                  <option value="male">{t('animals.male')}</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('animals.notes')}
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                rows={3}
                className="input resize-none"
                placeholder="Additional notes about the animal..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="btn btn-secondary px-4 py-2"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4 py-2"
              >
                {t('common.save')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Animals table */}
      <div className="card">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">
            Animals ({filteredAnimals.length})
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.name')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('animals.species')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('animals.breed')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('animals.gender')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.status')}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t('common.actions')}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAnimals.map((animal) => (
                <tr key={animal.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {animal.name}
                    </div>
                    {animal.tempId && (
                      <div className="text-xs text-yellow-600">Pending sync</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.species}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.breed}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {animal.gender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      animal.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {animal.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-primary-600 hover:text-primary-900 mr-3">
                      {t('common.edit')}
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      {t('common.delete')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAnimals.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500">
                {searchTerm ? 'No animals found matching your search.' : 'No animals added yet.'}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalsPage;