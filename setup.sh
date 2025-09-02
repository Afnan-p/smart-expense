#!/bin/bash

echo "🚀 Setting up Smart Expense Tracker..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed. Please install Node.js v16 or higher."
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    print_error "Node.js version 16 or higher is required. Current version: $(node -v)"
    exit 1
fi

print_success "Node.js version: $(node -v)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    print_error "npm is not installed. Please install npm."
    exit 1
fi

print_success "npm version: $(npm -v)"

# Setup Backend
print_status "Setting up backend..."
cd server

# Install dependencies
print_status "Installing backend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Backend dependencies installed successfully"
else
    print_error "Failed to install backend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file for backend..."
    cp env.example .env
    print_success "Backend .env file created"
else
    print_warning "Backend .env file already exists"
fi

cd ..

# Setup Frontend
print_status "Setting up frontend..."
cd client

# Install dependencies
print_status "Installing frontend dependencies..."
npm install

if [ $? -eq 0 ]; then
    print_success "Frontend dependencies installed successfully"
else
    print_error "Failed to install frontend dependencies"
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    print_status "Creating .env file for frontend..."
    cp env.example .env
    print_success "Frontend .env file created"
else
    print_warning "Frontend .env file already exists"
fi

cd ..

print_success "🎉 Setup completed successfully!"

echo ""
echo "📋 Next steps:"
echo "1. Make sure MongoDB is running locally or update the MONGODB_URI in server/.env"
echo "2. Start the backend server: cd server && npm run dev"
echo "3. Start the frontend server: cd client && npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📚 For more information, check the README.md file"
echo ""
