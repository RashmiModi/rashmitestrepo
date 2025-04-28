// pages/api/auth/_log.ts

export default function handler(req:any, res:any) {
    if (req.method === 'POST') {
      // Handle the log request here (you can log to a database or a logging service)
      console.log('Auth Log:', req.body);
  
      res.status(200).json({ message: 'Log received' });
    } else {
      // Method Not Allowed for anything other than POST
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  