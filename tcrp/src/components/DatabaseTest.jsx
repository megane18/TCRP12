import React, { useState, useEffect } from 'react';
import { dbService } from '../services/DatabaseService';

export default function DatabaseTest() {
  const [testResult, setTestResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function testDatabase() {
      try {
        await dbService.init();
        await dbService.query('CREATE TABLE IF NOT EXISTS test_table (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)');
        await dbService.query('INSERT INTO test_table (name) VALUES (?)', [`Test User ${new Date().toISOString()}`]);
        const result = await dbService.query('SELECT * FROM test_table');
        setTestResult(result[0]);
      } catch (err) {
        console.error('Database test failed:', err);
        setError(err.message);
      }
    }

    testDatabase();
  }, []);

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
    backgroundColor: '#f2f2f2',
    fontWeight: 'bold',
  };

  return (
    <div>
      <h2>Database Test Result</h2>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : testResult ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              {testResult.columns.map((column, index) => (
                <th key={index} style={headerCellStyle}>{column}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {testResult.values.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={cellStyle}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}