import React, { useState, useEffect } from 'react';
import { Plus, Edit, X } from 'lucide-react';
import { formatDateForInput } from '../utils/format';

const TransactionForm = ({ 
  transaction = null, 
  onSubmit, 
  onCancel, 
  isLoading = false 
}) => {
  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    type: 'expense',
    date: formatDateForInput(new Date()),
    description: ''
  });

  const [errors, setErrors] = useState({});

  const categories = [
    'Food', 'Transport', 'Entertainment', 'Shopping', 
    'Bills', 'Healthcare', 'Education', 'Other'
  ];

  // Initialize form with transaction data if editing
  useEffect(() => {
    if (transaction) {
      setFormData({
        title: transaction.title || '',
        amount: transaction.amount || '',
        category: transaction.category || '',
        type: transaction.type || 'expense',
        date: formatDateForInput(transaction.date) || formatDateForInput(new Date()),
        description: transaction.description || ''
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 50) {
      newErrors.title = 'Title must be less than 50 characters';
    }

    if (!formData.amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (formData.description && formData.description.length > 200) {
      newErrors.description = 'Description must be less than 200 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const submitData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    onSubmit(submitData);
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      amount: '',
      category: '',
      type: 'expense',
      date: formatDateForInput(new Date()),
      description: ''
    });
    setErrors({});
    onCancel();
  };

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {transaction ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>
        <button
          onClick={handleCancel}
          className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`input ${errors.title ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            placeholder="Enter transaction title"
            maxLength={50}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-danger-600">{errors.title}</p>
          )}
        </div>

        {/* Amount and Type */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className={`input ${errors.amount ? 'border-danger-500 focus:ring-danger-500' : ''}`}
              placeholder="0.00"
              step="0.01"
              min="0"
            />
            {errors.amount && (
              <p className="mt-1 text-sm text-danger-600">{errors.amount}</p>
            )}
          </div>

          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type *
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input"
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        {/* Category and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={`input ${errors.category ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            >
              <option value="">Select a category</option>
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-danger-600">{errors.category}</p>
            )}
          </div>

          <div>
            <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
              Date *
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={`input ${errors.date ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            />
            {errors.date && (
              <p className="mt-1 text-sm text-danger-600">{errors.date}</p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`input resize-none ${errors.description ? 'border-danger-500 focus:ring-danger-500' : ''}`}
            placeholder="Enter transaction description"
            rows="3"
            maxLength={200}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-danger-600">{errors.description}</p>
          )}
          <p className="mt-1 text-xs text-gray-500">
            {formData.description.length}/200 characters
          </p>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : transaction ? (
              <>
                <Edit size={16} />
                Update Transaction
              </>
            ) : (
              <>
                <Plus size={16} />
                Add Transaction
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleCancel}
            disabled={isLoading}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransactionForm;
