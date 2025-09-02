import { format, parseISO } from 'date-fns';

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Format date
export const formatDate = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

// Format date for input
export const formatDateForInput = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy-MM-dd');
};

// Get category color
export const getCategoryColor = (category) => {
  const colors = {
    Food: 'bg-orange-100 text-orange-800',
    Transport: 'bg-blue-100 text-blue-800',
    Entertainment: 'bg-purple-100 text-purple-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Bills: 'bg-red-100 text-red-800',
    Healthcare: 'bg-green-100 text-green-800',
    Education: 'bg-indigo-100 text-indigo-800',
    Other: 'bg-gray-100 text-gray-800',
  };
  
  return colors[category] || colors.Other;
};

// Get category icon
export const getCategoryIcon = (category) => {
  const icons = {
    Food: '🍽️',
    Transport: '🚗',
    Entertainment: '🎬',
    Shopping: '🛍️',
    Bills: '📄',
    Healthcare: '🏥',
    Education: '📚',
    Other: '📦',
  };
  
  return icons[category] || icons.Other;
};

// Truncate text
export const truncateText = (text, maxLength = 50) => {
  if (!text) return '';
  return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
};

// Calculate percentage
export const calculatePercentage = (value, total) => {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
};

// Generate random ID (for demo purposes)
export const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
};
