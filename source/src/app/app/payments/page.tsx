"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PayMayaForm from "@/features/student/PayMaya";
import { ChevronLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PaymentPage() {
  return (
    <div className="flex flex-col w-4xl mx-auto">
      {/* header */}
      <div className="flex items-center py-2">
        <div className="text-xl font-bold mr-auto">Online Payment System</div>
      </div>
      {/* header */}
      <Link href="/app">
        <Button variant="ghost">
          <ChevronLeftIcon /> Back
        </Button>
      </Link>
      <div className="w-md mx-auto flex flex-col mt-8">
        <div className="font-bold text-3xl">Choose a payment method</div>
        <PayMayaForm />
        <Separator />
        <div className="py-4 flex items-center gap-4">
          <Image src="/hellomoney.png" alt="hellomoney" width={40} height={40} />
          <div className="text-xl font-semibold">Hello Money</div>
        </div>
        <Separator />
        <div className="py-4 flex items-center gap-4">
          <Image src="/gcash.png" alt="gcash" width={40} height={40} />
          <div className="text-xl font-semibold">Gcash</div>
        </div>
        <Separator />
      </div>
    </div>
  )
}
