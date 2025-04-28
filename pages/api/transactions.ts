// pages/api/transactions.js
import { NextApiRequest, NextApiResponse } from 'next';

// Environment variables for Razorpay credentials
const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET;

const fetchTransactions = async (req:any, res:any) => {
  try {
    // Define the API URL for fetching transactions
    const url = 'https://api.razorpay.com/v1/payments';

    // Set up the basic authorization header
    const headers = {
      'Authorization': `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`,
    };

    // Fetch transaction data from Razorpay API
    const response = await fetch(url, { headers });

    // Check if the response is OK
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching transactions:', errorText);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    // Parse the JSON response from Razorpay
    const transactionData = await response.json();

    // Return the transaction data as a JSON response
    res.status(200).json(transactionData);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default fetchTransactions;
