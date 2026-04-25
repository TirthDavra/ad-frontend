"use client"

import { useEffect, useRef } from "react"

interface AdBannerProps {
  adSlot: string
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal"
  fullWidth?: boolean
}

export default function AdBanner({
  adSlot,
  adFormat = "auto",
  fullWidth = false,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement | null>(null)

  useEffect(() => {
    try {
      if (
        typeof window !== "undefined" &&
        adRef.current &&
        !(adRef.current as any).dataset.adsbygoogleStatus
      ) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
      }
    } catch (e) {
      console.error("AdSense error:", e)
    }
  }, [])

  return (
    <div className="w-full my-4">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client="ca-pub-xxxxxxxxxxxx"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? "true" : "false"}
      />
    </div>
  )
}