import React, { useState, useEffect } from 'react';
import { dbService } from '../services/DatabaseService';

export default function DatabaseTest() {
  const [users, setUsers] = useState([]);
  const [newUserName, setNewUserName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        await dbService.init();
        await dbService.query('CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        const result = await dbService.query('SELECT * FROM test_table');
        setUsers(result[0] ? result[0].values : []);
      } catch (err) {
        console.error('Failed to load users:', err);
        setError(err.message);
      }
    }

    loadUsers();
  }, []);

  const addUser = async () => {
    if (!newUserName.trim()) return;
    try {
      await dbService.query('INSERT INTO test_table (name) VALUES (?)', [newUserName]);
      const result = await dbService.query('SELECT * FROM test_table');
      setUsers(result[0].values);
      setNewUserName(''); // Clear input
    } catch (err) {
      console.error('Failed to add user:', err);
      setError(err.message);
    }
  };

  const removeUser = async (id) => {
    try {
      await dbService.query('DELETE FROM test_table WHERE id = ?', [id]);
      const result = await dbService.query('SELECT * FROM test_table');
      setUsers(result[0].values);
    } catch (err) {
      console.error('Failed to remove user:', err);
      setError(err.message);
    }
  };

  const tableStyle = {
    borderCollapse: 'collapse',
    width: '100%',
    maxWidth: '500px',
    margin: '20px 0',
    fontFamily: 'Arial, sans-serif',
  };

  const cellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const headerCellStyle = {
    ...cellStyle,
    backgroundColor: '#1a1a1a',
    fontWeight: 'bold',
  };

  return (
    <div>
      <h2>Database Test Result</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Enter new user name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
          <button onClick={addUser}>Add User</button>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={headerCellStyle}>ID</th>
                <th style={headerCellStyle}>Name</th>
                <th style={headerCellStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td style={cellStyle}>{row[0]}</td>
                  <td style={cellStyle}>{row[1]}</td>
                  <td style={cellStyle}>
                    <button onClick={() => removeUser(row[0])}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
