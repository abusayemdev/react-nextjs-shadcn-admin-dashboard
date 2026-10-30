import AuthLayout from "@/components/auth/auth-layout";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";


async function Authpage() {

  const session = await getSession();

  if (session) {
    redirect("/admin/dashboard");
  }

  return <AuthLayout />;
}

export default Authpage;
