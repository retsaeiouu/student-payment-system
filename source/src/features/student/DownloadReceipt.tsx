"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react"

export default function DownloadReceipt() {
  const [isDownload, setIsDownload] = useState(false)
  return (
    <div className={isDownload ? "hidden" : ""}>
      <Button variant="ghost" className="w-fit mb-4" onClick={async () => {
        setIsDownload(true)
        await new Promise((resolve) => setTimeout(resolve, 500))
        window.print()
        setIsDownload(false)
      }}>
        Download receipt
      </Button>
      <Link href="/app" className={buttonVariants({ variant: "ghost" })}>
        Go back
      </Link>
    </div>
  )
}
