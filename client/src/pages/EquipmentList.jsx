import React, { useState, useEffect } from 'react';
import { equipmentAPI, requestAPI } from '../services/api';
import { Package, Search, Filter, AlertCircle } from 'lucide-react';

const EquipmentList = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [requesting, setRequesting] = useState(null);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    try {
      const response = await equipmentAPI.getAvailable();
      setEquipment(response.data);
    } catch (err) {
      setError('Failed to fetch equipment');
    } finally {
      setLoading(false);
    }
  };

  const handleRequest = async (equipmentId) => {
    setRequesting(equipmentId);
    try {
      await requestAPI.create({ equipment_id: equipmentId });
      await fetchEquipment();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to request equipment');
    } finally {
      setRequesting(null);
    }
  };

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...new Set(equipment.map(item => item.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Available Equipment</h1>
        <p className="mt-2 text-gray-600">Browse and request available equipment</p>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 mb-6">
          <div className="flex">
            <AlertCircle className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <p className="text-sm text-red-800">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search equipment..."
                className="input pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="sm:w-48">
            <select
              className="input"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      {filteredEquipment.length === 0 ? (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No equipment found</h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEquipment.map((item) => (
            <div key={item.id} className="card">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
                <Package className="w-8 h-8 text-gray-400" />
              </div>
              
              <div className="space-y-2 mb-4">
                <div>
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="ml-2 text-sm text-gray-900">{item.category}</span>
                </div>
                {item.description && (
                  <div>
                    <span className="text-sm text-gray-500">Description:</span>
                    <p className="mt-1 text-sm text-gray-900">{item.description}</p>
                  </div>
                )}
              </div>

              <button
                onClick={() => handleRequest(item.id)}
                disabled={requesting === item.id}
                className="btn btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {requesting === item.id ? 'Requesting...' : 'Request Equipment'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EquipmentList;
