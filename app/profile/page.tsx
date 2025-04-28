'use client';

import { useSession } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;  // Show loading state while fetching the session
  }

  if (status === "unauthenticated") {
    return <p>You must be signed in</p>;  // Display a message if not authenticated
  }

  if (!session) {
    return <p>You must be signed in</p>;
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
    </div>
  );
}
