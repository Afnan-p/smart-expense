import React, { useState } from 'react';
import { Edit, Trash2, Eye, ChevronDown, ChevronUp } from 'lucide-react';
import { formatCurrency, formatDate, getCategoryColor, getCategoryIcon, truncateText } from '../utils/format';

const TransactionList = ({ 
  transactions = [], 
  onEdit, 
  onDelete, 
  onView,
  isLoading = false 
}) => {
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [expandedRows, setExpandedRows] = useState(new Set());

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const toggleRowExpansion = (id) => {
    const newExpandedRows = new Set(expandedRows);
    if (newExpandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const sortedTransactions = [...transactions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle date sorting
    if (sortField === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }

    // Handle amount sorting
    if (sortField === 'amount') {
      aValue = parseFloat(aValue);
      bValue = parseFloat(bValue);
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getSortIcon = (field) => {
    if (sortField !== field) {
      return <ChevronDown size={16} className="text-gray-400" />;
    }
    return sortDirection === 'asc' ? 
      <ChevronUp size={16} className="text-primary-600" /> : 
      <ChevronDown size={16} className="text-primary-600" />;
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-primary-600 border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-gray-600">Loading transactions...</span>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="card">
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
          <p className="text-gray-500">Get started by adding your first transaction.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <button
                  onClick={() => handleSort('title')}
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  Title
                  {getSortIcon('title')}
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <button
                  onClick={() => handleSort('amount')}
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  Amount
                  {getSortIcon('amount')}
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <button
                  onClick={() => handleSort('category')}
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  Category
                  {getSortIcon('category')}
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <button
                  onClick={() => handleSort('type')}
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  Type
                  {getSortIcon('type')}
                </button>
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center gap-1 hover:text-primary-600 transition-colors"
                >
                  Date
                  {getSortIcon('date')}
                </button>
              </th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <React.Fragment key={transaction._id}>
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{getCategoryIcon(transaction.category)}</span>
                      <div>
                        <div className="font-medium text-gray-900">
                          {truncateText(transaction.title, 30)}
                        </div>
                        {transaction.description && (
                          <div className="text-sm text-gray-500">
                            {truncateText(transaction.description, 40)}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`font-semibold ${
                      transaction.type === 'income' ? 'text-success-600' : 'text-danger-600'
                    }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(transaction.category)}`}>
                      {transaction.category}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      transaction.type === 'income' 
                        ? 'bg-success-100 text-success-800' 
                        : 'bg-danger-100 text-danger-800'
                    }`}>
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onView(transaction)}
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onEdit(transaction)}
                        className="p-1 text-gray-400 hover:text-primary-600 transition-colors"
                        title="Edit transaction"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDelete(transaction._id)}
                        className="p-1 text-gray-400 hover:text-danger-600 transition-colors"
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
                {expandedRows.has(transaction._id) && (
                  <tr className="bg-gray-50">
                    <td colSpan="6" className="px-4 py-3">
                      <div className="space-y-2">
                        <div>
                          <span className="font-medium text-gray-700">Description:</span>
                          <span className="ml-2 text-gray-600">
                            {transaction.description || 'No description provided'}
                          </span>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Created:</span>
                          <span className="ml-2 text-gray-600">
                            {formatDate(transaction.createdAt)}
                          </span>
                        </div>
                        {transaction.updatedAt !== transaction.createdAt && (
                          <div>
                            <span className="font-medium text-gray-700">Last updated:</span>
                            <span className="ml-2 text-gray-600">
                              {formatDate(transaction.updatedAt)}
                            </span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-sm text-gray-500 text-center">
        Showing {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default TransactionList;
