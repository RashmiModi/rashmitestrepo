'use client'
import { useState, useEffect } from 'react';

type Transaction = {
  id: string;
  amount: number;
  status: string;
  method: string;
  customer_id?: string;
  description?: string;
    name?: string;
    email?: string;
    contact?: string;
 
};

const TransactionsPage = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('/api/transactions'); // Your API endpoint
        const data = await response.json();
        console.log("data",data)
        if (response.ok) {
          setTransactions(data.items); // assuming data.items contains transactions
        
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
      <h1 className="text-2xl font-bold mb-6">Transaction Details</h1>

      {error && <p className="text-red-500">{error}</p>}

      {transactions.length === 0 ? (
        <p>No transactions found.</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <caption className="text-xl font-semibold mb-4">Transactions List</caption>
          <thead>
            <tr>
              <th className="border px-4 py-2">Transaction ID</th>
              <th className="border px-4 py-2">Amount</th>
              <th className="border px-4 py-2">Description</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Payment Method</th>
              <th className="border px-4 py-2">Customer Info</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="border px-4 py-2">{transaction.id}</td>
                <td className="border px-4 py-2">₹{(transaction.amount / 100).toFixed(2)}</td>
                <td className="border px-4 py-2">₹{(transaction.description)}</td>
                <td className="border px-4 py-2">{transaction.status}</td>
                <td className="border px-4 py-2">{transaction.method}</td>
                <td>
               
                    <p className="border px-4 py-2">{transaction.email }</p>
                    <p className="border px-4 py-2">{transaction.contact }</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionsPage;
