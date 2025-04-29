import { useSession } from "next-auth/react"
type SessionUser = {
  accessToken?: string;
  // You can add more fields if needed (like id, name, email, etc.)
};
export default function Component() {
  const { data: session } = useSession()

  const accessToken = (session?.user as SessionUser)?.accessToken;

  return <div>Access Token: {accessToken}</div>
}
