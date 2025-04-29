// pages/api/transactions.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID!;
const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;

const fetchTransactions = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const url = 'https://api.razorpay.com/v1/payments';

    const headers = {
      'Authorization': `Basic ${Buffer.from(`${RAZORPAY_KEY_ID}:${RAZORPAY_KEY_SECRET}`).toString('base64')}`,
    };

    const response = await fetch(url, { headers });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error fetching transactions:', errorText);
      return res.status(500).json({ error: 'Failed to fetch transactions' });
    }

    const transactionData = await response.json();

    res.status(200).json(transactionData);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default fetchTransactions;
