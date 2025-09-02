import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { formatCurrency, calculatePercentage } from '../utils/format';

const Summary = ({ summary = {}, categoryBreakdown = [], isLoading = false }) => {
  const { balance = 0, income = 0, expenses = 0 } = summary;

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[1, 2, 3].map((i) => (
          <div key={i} className="card animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const totalTransactions = income + expenses;
  const incomePercentage = calculatePercentage(income, totalTransactions);
  const expensePercentage = calculatePercentage(expenses, totalTransactions);

  return (
    <div className="space-y-6">
      {/* Main Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Balance Card */}
        <div className="card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Balance</p>
              <p className={`text-2xl font-bold ${balance >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {formatCurrency(balance)}
              </p>
            </div>
            <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-success-100' : 'bg-danger-100'}`}>
              <DollarSign 
                size={24} 
                className={balance >= 0 ? 'text-success-600' : 'text-danger-600'} 
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-gray-600">Net cash flow</span>
            </div>
          </div>
        </div>

        {/* Income Card */}
        <div className="card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Income</p>
              <p className="text-2xl font-bold text-success-600">
                {formatCurrency(income)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-success-100">
              <TrendingUp size={24} className="text-success-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-gray-600">
                {incomePercentage}% of total transactions
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${incomePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="card-hover">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-danger-600">
                {formatCurrency(expenses)}
              </p>
            </div>
            <div className="p-3 rounded-full bg-danger-100">
              <TrendingDown size={24} className="text-danger-600" />
            </div>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm">
              <span className="text-gray-600">
                {expensePercentage}% of total transactions
              </span>
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-danger-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${expensePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      {categoryBreakdown.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-2 mb-6">
            <PieChart size={20} className="text-primary-600" />
            <h3 className="text-lg font-semibold text-gray-900">Category Breakdown</h3>
          </div>
          
          <div className="space-y-4">
            {categoryBreakdown.map((category) => {
              const percentage = calculatePercentage(category.total, expenses);
              return (
                <div key={category._id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <span className="font-medium text-gray-700">{category._id}</span>
                    <span className="text-sm text-gray-500">({category.count} transactions)</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">
                        {formatCurrency(category.total)}
                      </div>
                      <div className="text-sm text-gray-500">{percentage}%</div>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Insights</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Income</span>
              <span className="font-semibold text-success-600">
                {income > 0 ? formatCurrency(income / categoryBreakdown.length) : formatCurrency(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Average Expense</span>
              <span className="font-semibold text-danger-600">
                {expenses > 0 ? formatCurrency(expenses / categoryBreakdown.length) : formatCurrency(0)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Savings Rate</span>
              <span className={`font-semibold ${balance >= 0 ? 'text-success-600' : 'text-danger-600'}`}>
                {totalTransactions > 0 ? `${calculatePercentage(balance, totalTransactions)}%` : '0%'}
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Financial Health</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${balance >= 0 ? 'bg-success-500' : 'bg-danger-500'}`}></div>
              <span className="text-gray-600">
                {balance >= 0 ? 'Positive cash flow' : 'Negative cash flow'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${income > expenses ? 'bg-success-500' : 'bg-warning-500'}`}></div>
              <span className="text-gray-600">
                {income > expenses ? 'Income exceeds expenses' : 'Expenses exceed income'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${totalTransactions > 0 ? 'bg-primary-500' : 'bg-gray-400'}`}></div>
              <span className="text-gray-600">
                {totalTransactions > 0 ? 'Active financial tracking' : 'No transactions yet'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
