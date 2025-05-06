export default async function PaymentDetails({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  console.log(slug)

  return (
    <div className="flex flex-col w-4xl mx-auto">
      <div>Amount paid: { }</div>
      <div>Date paid: { }</div>
      <div>Paid with: { }</div>
      <div>Account number: { }</div>
      <div>Account name: { }</div>
      <div>Remaining balance: { }</div>
    </div>
  )
}
