const express = require('express');
const { body, validationResult } = require('express-validator');
const Transaction = require('../models/Transaction');

const router = express.Router();

// Validation middleware
const validateTransaction = [
  body('title')
    .trim()
    .isLength({ min: 1, max: 50 })
    .withMessage('Title must be between 1 and 50 characters'),
  body('amount')
    .isFloat({ min: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .isIn(['Food', 'Transport', 'Entertainment', 'Shopping', 'Bills', 'Healthcare', 'Education', 'Other'])
    .withMessage('Please select a valid category'),
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be either income or expense'),
  body('date')
    .optional()
    .isISO8601()
    .withMessage('Date must be a valid date'),
  body('description')
    .optional()
    .isLength({ max: 200 })
    .withMessage('Description cannot be more than 200 characters')
];

// Helper function to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

// @route   POST /api/transactions
// @desc    Create a new transaction
// @access  Public
router.post('/', validateTransaction, handleValidationErrors, async (req, res) => {
  try {
    const { title, amount, category, type, date, description } = req.body;

    const transaction = new Transaction({
      title,
      amount,
      category,
      type,
      date: date || new Date(),
      description
    });

    const savedTransaction = await transaction.save();

    res.status(201).json({
      success: true,
      data: savedTransaction,
      message: 'Transaction created successfully'
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating transaction'
    });
  }
});

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, sort = '-date', category, type } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (type) filter.type = type;

    // Calculate pagination
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find(filter)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Transaction.countDocuments(filter);

    res.json({
      success: true,
      data: transactions,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching transactions'
    });
  }
});

// @route   GET /api/transactions/summary
// @desc    Get transaction summary (balance, income, expenses)
// @access  Public
router.get('/summary', async (req, res) => {
  try {
    const transactions = await Transaction.find();

    const summary = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    }, { income: 0, expenses: 0 });

    summary.balance = summary.income - summary.expenses;

    // Category breakdown
    const categoryBreakdown = await Transaction.aggregate([
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);

    res.json({
      success: true,
      data: {
        summary,
        categoryBreakdown
      }
    });
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching summary'
    });
  }
});

// @route   GET /api/transactions/:id
// @desc    Get a single transaction
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    res.json({
      success: true,
      data: transaction
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while fetching transaction'
    });
  }
});

// @route   PUT /api/transactions/:id
// @desc    Update a transaction
// @access  Public
router.put('/:id', validateTransaction, handleValidationErrors, async (req, res) => {
  try {
    const { title, amount, category, type, date, description } = req.body;

    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    transaction.title = title;
    transaction.amount = amount;
    transaction.category = category;
    transaction.type = type;
    transaction.date = date || transaction.date;
    transaction.description = description;

    const updatedTransaction = await transaction.save();

    res.json({
      success: true,
      data: updatedTransaction,
      message: 'Transaction updated successfully'
    });
  } catch (error) {
    console.error('Error updating transaction:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while updating transaction'
    });
  }
});

// @route   DELETE /api/transactions/:id
// @desc    Delete a transaction
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    await transaction.deleteOne();

    res.json({
      success: true,
      message: 'Transaction deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        message: 'Invalid transaction ID'
      });
    }
    res.status(500).json({
      success: false,
      message: 'Server error while deleting transaction'
    });
  }
});

module.exports = router;
