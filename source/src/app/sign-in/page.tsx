import { getAccountByCookie, handleAuthorization } from "@/features/sign-in/actions";
import SignInForm from "@/features/sign-in/form";

export default async function SignIn() {
  const account = await getAccountByCookie()
  if (account) await handleAuthorization(account.role)

  return (
    <div className="flex flex-col w-4xl mx-auto gap-8">
      {/* header */}
      <div className="text-xl font-bold py-2">Online Payment System</div>
      {/* header */}
      <SignInForm />
    </div>
  )
}
