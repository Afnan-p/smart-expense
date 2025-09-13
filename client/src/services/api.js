// import axios from 'axios';
// import toast from 'react-hot-toast';

// // Create axios instance
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor
// api.interceptors.request.use(
//   (config) => {
//     // You can add auth tokens here if needed
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Response interceptor
// api.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     const message = error.response?.data?.message || 'Something went wrong!';
    
//     // Don't show toast for 404 errors (user navigation)
//     if (error.response?.status !== 404) {
//       toast.error(message);
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Transaction API functions
// export const transactionAPI = {
//   // Get all transactions
//   getAll: async (params = {}) => {
//     const response = await api.get('/transactions', { params });
//     return response.data;
//   },

//   // Get transaction by ID
//   getById: async (id) => {
//     const response = await api.get(`/transactions/${id}`);
//     return response.data;
//   },

//   // Create new transaction
//   create: async (transactionData) => {
//     const response = await api.post('/transactions', transactionData);
//     return response.data;
//   },

//   // Update transaction
//   update: async (id, transactionData) => {
//     const response = await api.put(`/transactions/${id}`, transactionData);
//     return response.data;
//   },

//   // Delete transaction
//   delete: async (id) => {
//     const response = await api.delete(`/transactions/${id}`);
//     return response.data;
//   },

//   // Get summary
//   getSummary: async () => {
//     const response = await api.get('/transactions/summary');
//     return response.data;
//   },
// };

// // Health check
// export const healthCheck = async () => {
//   const response = await api.get('/health');
//   return response.data;
// };

// export default api;

import axios from 'axios';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong!';
    if (error.response?.status !== 404) {
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

export const transactionAPI = {
  getAll: async (params = {}) => {
    const response = await api.get('/transactions', { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/transactions/${id}`);
    return response.data;
  },

  create: async (transactionData) => {
    const response = await api.post('/transactions', transactionData);
    return response.data;
  },

  update: async (id, transactionData) => {
    const response = await api.put(`/transactions/${id}`, transactionData);
    return response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/transactions/${id}`);
    return response.data;
  },

  getSummary: async () => {
    const response = await api.get('/transactions/summary');
    return response.data;
  },
};

export const healthCheck = async () => {
  const response = await api.get('/health');
  return response.data;
};

export default api;
