import { getCurrentUser } from "@/app/actions/user";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export default async function LoginPage () {
   const user = await getCurrentUser();
   if (user === null) {
      return <LoginForm />
   } else {
      redirect("/");
   }
}
