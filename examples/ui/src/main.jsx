import React from 'react';
import ReactDOM from 'react-dom/client';

// Simple React component for the demo
function App() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      <h1 style={{ color: '#0366d6' }}>GitHub Demo Repository</h1>
      
      <p>
        This is a demonstration of GitHub features, best practices, and development workflows.
      </p>
      
      <div style={{ backgroundColor: '#f6f8fa', border: '1px solid #e1e4e8', borderRadius: '6px', padding: '1.5rem', margin: '2rem 0' }}>
        <h2>Features Demonstrated</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eaecef' }}>🔒 JWT Authentication</li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eaecef' }}>📊 React Dashboard</li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eaecef' }}>🔄 CI/CD Pipeline</li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eaecef' }}>📝 Documentation</li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eaecef' }}>🐳 Docker Setup</li>
          <li style={{ padding: '0.5rem 0', borderBottom: '1px solid #eaecef' }}>📦 GitHub Actions</li>
          <li style={{ padding: '0.5rem 0' }}>🕵️ Security Scans</li>
        </ul>
      </div>
      
      <p>
        <a href="https://github.com/TMHSDigital/Github-Demo-Repo" style={{ color: '#0366d6', textDecoration: 'none' }}>View the repository on GitHub</a>
      </p>
      
      <div style={{ marginTop: '3rem', fontSize: '0.9rem', color: '#586069', textAlign: 'center' }}>
        &copy; 2025 GitHub Demo Repository - MIT License
      </div>
    </div>
  );
}

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
); 