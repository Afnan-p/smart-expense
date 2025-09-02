# Smart Expense Tracker

A modern, full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a beautiful UI with Tailwind CSS.

## 🚀 Features

- **Add Transactions**: Create new income or expense entries with categories
- **Edit & Delete**: Modify or remove existing transactions
- **Real-time Summary**: View balance, income, and expense totals
- **Category Breakdown**: Visual representation of spending by category
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Form Validation**: Client and server-side validation with error handling
- **Loading States**: Smooth loading indicators and user feedback
- **Toast Notifications**: Success and error messages

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Express Validator** - Input validation
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library
- **Date-fns** - Date utility library

## 📁 Project Structure

```
smart-expense-tracker/
├── server/                 # Backend
│   ├── config/
│   │   └── db.js          # Database configuration
│   ├── models/
│   │   └── Transaction.js # Transaction model
│   ├── routes/
│   │   └── transactions.js # API routes
│   ├── package.json
│   ├── server.js          # Express server
│   └── env.example        # Environment variables template
└── client/                # Frontend
    ├── src/
    │   ├── components/
    │   │   ├── TransactionForm.jsx
    │   │   ├── TransactionList.jsx
    │   │   └── Summary.jsx
    │   ├── services/
    │   │   └── api.js     # API service
    │   ├── utils/
    │   │   └── format.js  # Utility functions
    │   ├── App.jsx        # Main app component
    │   ├── main.jsx       # React entry point
    │   └── index.css      # Global styles
    ├── package.json
    ├── vite.config.js
    └── index.html
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smart-expense-tracker
   ```

2. **Set up the Backend**
   ```bash
   cd server
   npm install
   ```

3. **Configure Environment Variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/smart-expense-tracker
   NODE_ENV=development
   ```

4. **Set up the Frontend**
   ```bash
   cd ../client
   npm install
   ```

5. **Start the Development Servers**

   **Terminal 1 - Backend:**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 - Frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📊 API Endpoints

### Transactions
- `GET /api/transactions` - Get all transactions
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get single transaction
- `PUT /api/transactions/:id` - Update transaction
- `DELETE /api/transactions/:id` - Delete transaction
- `GET /api/transactions/summary` - Get summary statistics

### Health Check
- `GET /api/health` - API health status

## 🎨 Features in Detail

### Transaction Management
- **Add**: Create new transactions with title, amount, category, type, and date
- **Edit**: Modify existing transactions
- **Delete**: Remove transactions with confirmation
- **View**: Detailed transaction information

### Categories
- Food 🍽️
- Transport 🚗
- Entertainment 🎬
- Shopping 🛍️
- Bills 📄
- Healthcare 🏥
- Education 📚
- Other 📦

### Summary Dashboard
- **Total Balance**: Net cash flow (income - expenses)
- **Income Overview**: Total income with percentage breakdown
- **Expense Overview**: Total expenses with percentage breakdown
- **Category Breakdown**: Visual representation of spending by category
- **Quick Insights**: Average income, expenses, and savings rate
- **Financial Health**: Status indicators for cash flow and spending patterns

## 🔧 Configuration

### Environment Variables

**Backend (.env):**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/smart-expense-tracker
NODE_ENV=development
```

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

### MongoDB Setup

1. **Local MongoDB:**
   - Install MongoDB locally
   - Start MongoDB service
   - Create database: `smart-expense-tracker`

2. **MongoDB Atlas:**
   - Create free account at MongoDB Atlas
   - Create cluster
   - Get connection string
   - Update `MONGODB_URI` in `.env`

## 🚀 Deployment

### Backend Deployment (Heroku)
```bash
cd server
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
git push heroku main
```

### Frontend Deployment (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy the dist folder
```

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Frontend Testing
```bash
cd client
npm test
```

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Future Enhancements

- [ ] User authentication and authorization
- [ ] Budget planning and tracking
- [ ] Export to PDF/Excel
- [ ] Charts and graphs
- [ ] Recurring transactions
- [ ] Multiple currencies
- [ ] Dark mode
- [ ] PWA support
- [ ] Offline functionality
- [ ] Data import/export

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Tailwind CSS](https://tailwindcss.com/) for the beautiful UI framework
- [Lucide React](https://lucide.dev/) for the amazing icons
- [React Hot Toast](https://react-hot-toast.com/) for toast notifications
- [Date-fns](https://date-fns.org/) for date utilities

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the maintainers.

---

**Happy coding! 🎉**
