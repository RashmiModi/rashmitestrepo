// pages/api/auth/session.ts

import { getSession } from 'next-auth/react';


export default async function handler(req:any, res:any) {
  if (req.method === 'GET') {
    // Get the current session
    const session = await getSession({ req });

    if (session) {
      // If session exists, send it back
      res.status(200).json(session);
    } else {
      // If no session exists, send 404 or appropriate error
      res.status(404).json({ message: 'No session found' });
    }
  } else {
    // Method Not Allowed for anything other than GET
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
