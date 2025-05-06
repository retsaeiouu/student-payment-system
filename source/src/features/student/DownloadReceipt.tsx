"use client"

import { useState } from "react"

export default function DownloadReceipt() {
  const [isDownload, setIsDownload] = useState(false)
  return (
    <button className={isDownload ? "hidden" : ""} onClick={async () => {
      setIsDownload(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      window.print()
      setIsDownload(false)
    }}>download</button>
  )
}
