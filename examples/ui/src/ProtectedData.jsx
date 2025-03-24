function ProtectedData({ data }) {
  if (!data) {
    return (
      <div className="protected-data">
        <h2>Protected Data</h2>
        <div className="loading">Loading protected data...</div>
      </div>
    );
  }

  return (
    <div className="protected-data">
      <h2>Protected Data</h2>
      <div className="data-container">
        <div className="data-message">
          <strong>Message:</strong> {data.message}
        </div>
        
        <div className="data-section">
          <h3>Resource Details</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <td>ID:</td>
                <td>{data.data.id}</td>
              </tr>
              <tr>
                <td>Name:</td>
                <td>{data.data.name}</td>
              </tr>
              <tr>
                <td>Description:</td>
                <td>{data.data.description}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="data-section">
          <h3>User Info</h3>
          <table className="data-table">
            <tbody>
              <tr>
                <td>User ID:</td>
                <td>{data.user.id}</td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>{data.user.username}</td>
              </tr>
              <tr>
                <td>Role:</td>
                <td>
                  <span className={`role-badge role-${data.user.role}`}>
                    {data.user.role}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProtectedData; 