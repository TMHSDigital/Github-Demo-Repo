import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import LoginForm from './LoginForm';
import ProtectedData from './ProtectedData';

// Register Chart.js components
Chart.register(...registerables);

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [protectedData, setProtectedData] = useState(null);

  // Function to handle login
  const handleLogin = async (credentials) => {
    try {
      // In a real app, this would use your actual API
      // const response = await fetch('http://localhost:3000/api/auth/login', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(credentials),
      // });
      
      // For demo purposes, mock the login
      const mockResponse = credentials.username === 'demo' && credentials.password === 'demo123';
      
      if (!mockResponse) {
        throw new Error('Invalid credentials');
      }
      
      // Mock successful authentication
      const userData = {
        id: 1,
        username: 'demo',
        role: 'user'
      };
      
      const tokenValue = 'mock-jwt-token';
      
      // Save token to localStorage
      localStorage.setItem('token', tokenValue);
      
      // Update state
      setToken(tokenValue);
      setUser(userData);
      return true;
    } catch (err) {
      setError('Login failed: ' + err.message);
      return false;
    }
  };

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    setProtectedData(null);
  };

  // Fetch protected data when user is logged in
  const fetchProtectedData = async () => {
    try {
      if (!token) return;
      
      // In a real app, this would use your actual API
      // const response = await fetch('http://localhost:3000/api/protected', {
      //   headers: {
      //     'Authorization': `Bearer ${token}`
      //   }
      // });
      
      // For demo purposes, mock the protected data
      const mockData = {
        message: 'This is a protected route',
        user: { id: 1, username: 'demo', role: 'user' },
        data: {
          id: 123,
          name: 'Protected Resource',
          description: 'This data is only available to authenticated users'
        }
      };
      
      setProtectedData(mockData);
    } catch (err) {
      setError('Failed to fetch protected data: ' + err.message);
    }
  };

  useEffect(() => {
    // Fetch public data
    const fetchData = async () => {
      try {
        // In a real app, replace with your API endpoint
        // const response = await fetch('http://localhost:3000/api/data');
        // const result = await response.json();
        
        // Using mock data for demonstration
        const mockData = [
          { id: 1, name: 'Feature 1', value: 75 },
          { id: 2, name: 'Feature 2', value: 42 },
          { id: 3, name: 'Feature 3', value: 63 }
        ];
        
        setData(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  // Fetch protected data when token changes
  useEffect(() => {
    if (token) {
      fetchProtectedData();
    }
  }, [token]);

  // Chart data configuration
  const chartData = {
    labels: data.map(item => item.name),
    datasets: [
      {
        label: 'Feature Usage',
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Feature Usage Dashboard'
      }
    }
  };

  return (
    <div className="app">
      <header>
        <h1>GitHub Demo UI</h1>
        <p>A demonstration of React, Chart.js, and API integration</p>
        
        {user ? (
          <div className="user-info">
            <span>Welcome, {user.username}!</span>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : null}
      </header>

      <main>
        <div className="content-area">
          {loading ? (
            <div className="loading">Loading data...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            <div className="chart-container">
              <Bar data={chartData} options={chartOptions} />
            </div>
          )}

          {!user ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <ProtectedData data={protectedData} />
          )}
        </div>

        <div className="features">
          <h2>Features Demonstrated</h2>
          <ul>
            <li>React component architecture</li>
            <li>Data visualization with Chart.js</li>
            <li>API integration patterns</li>
            <li>Loading and error states</li>
            <li>Authentication with JWT</li>
            <li>Protected routes and data</li>
          </ul>
        </div>
      </main>

      <footer>
        <p>GitHub Demo Repository &copy; 2025</p>
      </footer>
    </div>
  );
}

export default App; 