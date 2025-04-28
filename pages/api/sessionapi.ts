// pages/api/sessionapi.ts
'use server'
import { getAuth } from '@clerk/nextjs/server'; // Get auth from Clerk's server-side utilities
import {  ClerkClient } from '@clerk/clerk-sdk-node'; // Import the Clerk class correctly

export default async function handler(req: any, res: any) {
  const { userId } = getAuth(req); // Get userId from the session

  if (!userId) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    // Initialize the Clerk instance correctly with API key
    const clerk = new (require('@clerk/clerk-sdk-node').ClerkClient)({ apiKey: process.env.CLERK_API_KEY! });


    // Fetch the user details using the userId
    const user = await clerk.users.getUser(userId);
      console.log("user--->",user)
    // Return user data (email, first name, etc.)
    res.status(200).json({
      message: 'Authenticated',
      userId,
      email: user.email, // Accessing email or any other user details
      firstName: user.firstName, // Example of other fields
      lastName: user.lastName,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: 'Error fetching user data', error: error.message });
    } else {
      res.status(500).json({ message: 'An unknown error occurred' });
    }
  }
}
