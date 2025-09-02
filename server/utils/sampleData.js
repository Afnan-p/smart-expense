const mongoose = require('mongoose');
const Transaction = require('../models/Transaction');
require('dotenv').config();

const sampleTransactions = [
  {
    title: 'Salary',
    amount: 5000,
    category: 'Other',
    type: 'income',
    date: new Date('2024-01-15'),
    description: 'Monthly salary payment'
  },
  {
    title: 'Grocery Shopping',
    amount: 120.50,
    category: 'Food',
    type: 'expense',
    date: new Date('2024-01-16'),
    description: 'Weekly groceries from Walmart'
  },
  {
    title: 'Gas Station',
    amount: 45.00,
    category: 'Transport',
    type: 'expense',
    date: new Date('2024-01-17'),
    description: 'Fuel for car'
  },
  {
    title: 'Netflix Subscription',
    amount: 15.99,
    category: 'Entertainment',
    type: 'expense',
    date: new Date('2024-01-18'),
    description: 'Monthly streaming service'
  },
  {
    title: 'Electric Bill',
    amount: 89.50,
    category: 'Bills',
    type: 'expense',
    date: new Date('2024-01-19'),
    description: 'Monthly electricity bill'
  },
  {
    title: 'Freelance Project',
    amount: 800,
    category: 'Other',
    type: 'income',
    date: new Date('2024-01-20'),
    description: 'Web development project payment'
  },
  {
    title: 'Restaurant Dinner',
    amount: 65.00,
    category: 'Food',
    type: 'expense',
    date: new Date('2024-01-21'),
    description: 'Dinner at Italian restaurant'
  },
  {
    title: 'Uber Ride',
    amount: 25.00,
    category: 'Transport',
    type: 'expense',
    date: new Date('2024-01-22'),
    description: 'Ride to airport'
  },
  {
    title: 'Shopping Mall',
    amount: 150.00,
    category: 'Shopping',
    type: 'expense',
    date: new Date('2024-01-23'),
    description: 'New clothes and accessories'
  },
  {
    title: 'Doctor Visit',
    amount: 75.00,
    category: 'Healthcare',
    type: 'expense',
    date: new Date('2024-01-24'),
    description: 'Annual checkup'
  },
  {
    title: 'Online Course',
    amount: 199.99,
    category: 'Education',
    type: 'expense',
    date: new Date('2024-01-25'),
    description: 'React development course on Udemy'
  },
  {
    title: 'Movie Tickets',
    amount: 32.00,
    category: 'Entertainment',
    type: 'expense',
    date: new Date('2024-01-26'),
    description: 'Weekend movie with friends'
  },
  {
    title: 'Bonus Payment',
    amount: 1000,
    category: 'Other',
    type: 'income',
    date: new Date('2024-01-27'),
    description: 'Performance bonus'
  },
  {
    title: 'Coffee Shop',
    amount: 8.50,
    category: 'Food',
    type: 'expense',
    date: new Date('2024-01-28'),
    description: 'Morning coffee and pastry'
  },
  {
    title: 'Bus Pass',
    amount: 60.00,
    category: 'Transport',
    type: 'expense',
    date: new Date('2024-01-29'),
    description: 'Monthly public transport pass'
  }
];

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const seedDatabase = async () => {
  try {
    await connectDB();
    
    // Clear existing data
    await Transaction.deleteMany({});
    console.log('Cleared existing transactions');
    
    // Insert sample data
    const insertedTransactions = await Transaction.insertMany(sampleTransactions);
    console.log(`Inserted ${insertedTransactions.length} sample transactions`);
    
    // Calculate and display summary
    const summary = insertedTransactions.reduce((acc, transaction) => {
      if (transaction.type === 'income') {
        acc.income += transaction.amount;
      } else {
        acc.expenses += transaction.amount;
      }
      return acc;
    }, { income: 0, expenses: 0 });
    
    summary.balance = summary.income - summary.expenses;
    
    console.log('\n📊 Sample Data Summary:');
    console.log(`Total Income: $${summary.income.toFixed(2)}`);
    console.log(`Total Expenses: $${summary.expenses.toFixed(2)}`);
    console.log(`Balance: $${summary.balance.toFixed(2)}`);
    
    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seeding function
seedDatabase();
