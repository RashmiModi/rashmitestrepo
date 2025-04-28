// pages/transactions.js
import { useState, useEffect } from 'react';

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        // Make an API call to fetch transaction data from your backend
        const response = await fetch('/api/transactions');
        const data = await response.json();

        if (response.ok) {
          setTransactions(data.items); // Assuming 'items' contains transaction details
        } else {
          setError(data.error || 'Failed to fetch transactions');
        }
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setError('Error fetching transactions');
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div>
      <h1>Transaction Details</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <ul>
          {transactions.map((transaction) => (
            <li key={transaction.id}>
              <p>Transaction ID: {transaction.id}</p>
              <p>Amount: ₹{(transaction.amount / 100).toFixed(2)}</p>
              <p>Status: {transaction.status}</p>
              <p>Payment Method: {transaction.method}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionsPage;
