"use client"

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import GCashForm from "@/features/student/GCash";
import HelloMoneyForm from "@/features/student/HelloMoney";
import PayMayaForm from "@/features/student/PayMaya";
import { ChevronLeftIcon } from "lucide-react";
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
        <HelloMoneyForm />
        <Separator />
        <GCashForm />
        <Separator />
      </div>
    </div>
  )
}
