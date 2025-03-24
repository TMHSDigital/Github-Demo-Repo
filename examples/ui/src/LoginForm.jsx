import { useState } from 'react';

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      const success = await onLogin({ username, password });
      
      if (!success) {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Login</h2>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={isLoading}
            placeholder="demo"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            placeholder="demo123"
            className="form-control"
          />
        </div>
        
        <button type="submit" disabled={isLoading} className="login-button">
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div className="login-help">
        <p>Use these demo credentials:</p>
        <ul>
          <li><strong>Username:</strong> demo</li>
          <li><strong>Password:</strong> demo123</li>
        </ul>
      </div>
    </div>
  );
}

export default LoginForm; 