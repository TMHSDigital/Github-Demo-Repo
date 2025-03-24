const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { authenticateUser, generateToken, authMiddleware, adminMiddleware } = require('./auth');
require('dotenv').config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Hide environment info in production
const isProduction = process.env.NODE_ENV === 'production';

// Public routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the GitHub Demo API',
    version: '1.0.0',
    endpoints: [
      { path: '/api/data', method: 'GET', description: 'Get sample data (public)' },
      { path: '/api/status', method: 'GET', description: 'Get server status (public)' },
      { path: '/api/auth/login', method: 'POST', description: 'Login to get token' },
      { path: '/api/protected', method: 'GET', description: 'Protected route (requires auth)' },
      { path: '/api/admin', method: 'GET', description: 'Admin route (requires admin role)' }
    ]
  });
});

app.get('/api/data', (req, res) => {
  // Sample data for demonstration
  const data = [
    { id: 1, name: 'Feature 1', status: 'active' },
    { id: 2, name: 'Feature 2', status: 'in-progress' },
    { id: 3, name: 'Feature 3', status: 'planned' }
  ];
  res.json(data);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date(),
    // Only expose environment in non-production
    environment: isProduction ? undefined : process.env.NODE_ENV || 'development'
  });
});

// Authentication routes
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  
  if (!username || !password) {
    return res.status(400).json({ 
      error: 'Bad Request',
      message: 'Username and password are required'
    });
  }
  
  const user = authenticateUser(username, password);
  
  if (!user) {
    return res.status(401).json({
      error: 'Unauthorized',
      message: 'Invalid username or password'
    });
  }
  
  const token = generateToken(user);
  
  res.json({
    message: 'Authentication successful',
    token,
    user
  });
});

// Protected routes (require authentication)
app.get('/api/protected', authMiddleware, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user,
    data: {
      id: 123,
      name: 'Protected Resource',
      description: 'This data is only available to authenticated users'
    }
  });
});

// Admin routes (require admin role)
app.get('/api/admin', authMiddleware, adminMiddleware, (req, res) => {
  res.json({
    message: 'This is an admin route',
    user: req.user,
    adminData: {
      stats: {
        users: 42,
        activeUsers: 28,
        inactiveUsers: 14
      },
      settings: {
        maintenanceMode: false,
        debugMode: true
      }
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong!',
    // Only expose error messages in non-production
    message: isProduction ? null : err.message
  });
});

// 404 handler for undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'The requested resource does not exist'
  });
});

// Start server
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`API server running on port ${port}`);
  });
}

module.exports = app; // Export for testing 