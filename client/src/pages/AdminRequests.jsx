import React, { useState, useEffect } from 'react';
import { requestAPI } from '../services/api';
import { ClipboardList, Clock, CheckCircle, XCircle, AlertCircle, User, Package } from 'lucide-react';

const AdminRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await requestAPI.getAll();
      setRequests(response.data);
    } catch (err) {
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    setUpdating(requestId);
    try {
      await requestAPI.updateStatus(requestId, status);
      await fetchRequests();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update request');
    } finally {
      setUpdating(null);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'Approved':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'Rejected':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <AlertCircle className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

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
        <h1 className="text-3xl font-bold text-gray-900">All Equipment Requests</h1>
        <p className="mt-2 text-gray-600">Review and manage equipment requests from all users</p>
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

      {requests.length === 0 ? (
        <div className="text-center py-12">
          <ClipboardList className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
          <p className="mt-1 text-sm text-gray-500">
            No equipment requests have been submitted yet
          </p>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {requests.map((request) => (
              <li key={request.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <div className="flex-shrink-0 mr-3">
                        {getStatusIcon(request.status)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {request.user?.name || 'Unknown User'}
                            </span>
                            <span className="text-sm text-gray-500 ml-2">
                              ({request.user?.email})
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Package className="w-4 h-4 text-gray-400 mr-2" />
                            <span className="text-sm font-medium text-gray-900">
                              {request.equipment?.name || 'Unknown Equipment'}
                            </span>
                          </div>
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          Category: {request.equipment?.category || 'N/A'}
                          {request.equipment?.description && (
                            <span className="ml-4">Description: {request.equipment.description}</span>
                          )}
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          Requested: {new Date(request.request_date).toLocaleDateString()} at {new Date(request.request_date).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                      {request.status}
                    </span>
                    
                    {request.status === 'Pending' && (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'Approved')}
                          disabled={updating === request.id}
                          className="btn btn-success text-sm px-3 py-1 disabled:opacity-50"
                        >
                          {updating === request.id ? 'Updating...' : 'Approve'}
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(request.id, 'Rejected')}
                          disabled={updating === request.id}
                          className="btn btn-danger text-sm px-3 py-1 disabled:opacity-50"
                        >
                          {updating === request.id ? 'Updating...' : 'Reject'}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminRequests;
