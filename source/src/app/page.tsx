import { getAccountByCookie, handleAuthorization } from "@/features/sign-in/actions"
import { redirect } from "next/navigation"

export default async function App() {

  const account = await getAccountByCookie()
  if (!account) redirect('/sign-in')
  await handleAuthorization(account.role)

  return <div className="flex items-center justify-center font-sans text-xl">Loading...</div>
}
