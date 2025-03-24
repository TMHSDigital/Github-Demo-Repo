const jwt = require('jsonwebtoken');

// In a real application, this would be stored in a database
const users = [
  {
    id: 1,
    username: 'demo',
    // In production, this would be a hashed password
    password: 'demo123',
    role: 'user'
  },
  {
    id: 2,
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  }
];

// Secret should be stored as environment variable
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '1h';

/**
 * Authenticate a user based on credentials
 * @param {string} username 
 * @param {string} password 
 * @returns {object|null} User object without password or null if authentication fails
 */
function authenticateUser(username, password) {
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return null;
  }
  
  // Return user without password
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Generate a JWT token for a user
 * @param {object} user User object
 * @returns {string} JWT token
 */
function generateToken(user) {
  return jwt.sign(
    { 
      id: user.id,
      username: user.username,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRATION }
  );
}

/**
 * Verify a JWT token
 * @param {string} token JWT token
 * @returns {object|null} Decoded token payload or null if invalid
 */
function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

/**
 * Middleware to authenticate requests
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {function} next Express next function
 */
function authMiddleware(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Authentication required' });
  }
  
  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ error: 'Unauthorized', message: 'Invalid or expired token' });
  }
  
  // Add user info to request object
  req.user = decoded;
  next();
}

/**
 * Middleware to check if user has admin role
 * @param {object} req Express request object
 * @param {object} res Express response object
 * @param {function} next Express next function
 */
function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Forbidden', message: 'Admin access required' });
  }
  
  next();
}

module.exports = {
  authenticateUser,
  generateToken,
  verifyToken,
  authMiddleware,
  adminMiddleware
}; 