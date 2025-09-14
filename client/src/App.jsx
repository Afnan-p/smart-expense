import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Plus, BarChart3, Home, Settings } from 'lucide-react';
import toast from 'react-hot-toast';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import Summary from './components/Summary';
import { transactionAPI } from './services/api';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({});
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Fetch transactions and summary on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [transactionsResponse, summaryResponse] = await Promise.all([
        transactionAPI.getAll(),
        transactionAPI.getSummary()
      ]);

      setTransactions(transactionsResponse.data);
      setSummary(summaryResponse.data.summary);
      setCategoryBreakdown(summaryResponse.data.categoryBreakdown);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddTransaction = async (transactionData) => {
    try {
      setIsSubmitting(true);
      const response = await transactionAPI.create(transactionData);
      
      setTransactions(prev => [response.data, ...prev]);
      
      // Update summary
      const summaryResponse = await transactionAPI.getSummary();
      setSummary(summaryResponse.data.summary);
      setCategoryBreakdown(summaryResponse.data.categoryBreakdown);
      
      setShowForm(false);
      toast.success('Transaction added successfully!');
    } catch (error) {
      console.error('Error adding transaction:', error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error('Failed to add transaction');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateTransaction = async (transactionData) => {
    try {
      setIsSubmitting(true);
      const response = await transactionAPI.update(editingTransaction._id, transactionData);
      
      setTransactions(prev => 
        prev.map(t => t._id === editingTransaction._id ? response.data : t)
      );
      
      // Update summary
      const summaryResponse = await transactionAPI.getSummary();
      setSummary(summaryResponse.data.summary);
      setCategoryBreakdown(summaryResponse.data.categoryBreakdown);
      
      setEditingTransaction(null);
      setShowForm(false);
      toast.success('Transaction updated successfully!');
    } catch (error) {
      console.error('Error updating transaction:', error);
      if (error.response?.data?.errors) {
        error.response.data.errors.forEach(err => {
          toast.error(`${err.field}: ${err.message}`);
        });
      } else {
        toast.error('Failed to update transaction');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTransaction = async (transactionId) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      await transactionAPI.delete(transactionId);
      
      setTransactions(prev => prev.filter(t => t._id !== transactionId));
      
      // Update summary
      const summaryResponse = await transactionAPI.getSummary();
      setSummary(summaryResponse.data.summary);
      setCategoryBreakdown(summaryResponse.data.categoryBreakdown);
      
      toast.success('Transaction deleted successfully!');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      toast.error('Failed to delete transaction');
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleViewTransaction = (transaction) => {
    // For now, just show a toast with transaction details
    toast.success(`${transaction.title} - ${transaction.type}`, {
      duration: 3000,
      icon: '👁️',
    });
  };

  const handleFormSubmit = (transactionData) => {
    if (editingTransaction) {
      handleUpdateTransaction(transactionData);
    } else {
      handleAddTransaction(transactionData);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingTransaction(null);
  };

  const HomePage = () => (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Smart Expense Tracker</h1>
          <p className="text-gray-600 mt-1">Manage your finances with ease</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      {/* Summary Section */}
      <Summary 
        summary={summary} 
        categoryBreakdown={categoryBreakdown}
        isLoading={isLoading}
      />

      {/* Transactions Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <TransactionList
          transactions={transactions}
          onEdit={handleEditTransaction}
          onDelete={handleDeleteTransaction}
          onView={handleViewTransaction}
          isLoading={isLoading}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <BarChart3 size={24} className="text-primary-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Smart Expense</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 text-gray-400 hover:text-primary-600 transition-colors"
                title="Home"
              >
                <Home size={20} />
              </button>
              {/* <button
                onClick={() => setShowForm(true)}
                className="btn-primary flex items-center gap-2"
              >
                <Plus size={16} />
                Add Transaction
              </button> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </main>

      {/* Transaction Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
            <TransactionForm
              transaction={editingTransaction}
              onSubmit={handleFormSubmit}
              onCancel={handleFormCancel}
              isLoading={isSubmitting}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
