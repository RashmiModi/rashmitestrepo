import { Button } from "@/components/ui/button";
import Link from "next/link"


const SetupPage=()=> {
  return (
    <div className="p-4">
        

      <Button size="default" variant="destructive"  asChild>
      <Link href="/sign-up">Sign Up</Link>
      </Button>
    </div>
  );
}

export default SetupPage;
