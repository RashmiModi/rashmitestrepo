// app/user/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function UserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
 
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/user');
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <h1>User List</h1>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <p>{user.username}</p>
              <p>{user.email}</p>
            
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
