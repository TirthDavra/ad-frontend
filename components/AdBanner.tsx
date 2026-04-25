'use client'

import { useEffect } from 'react'

interface AdBannerProps {
  adSlot: string
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal'
  fullWidth?: boolean
}

export  default function AdBanner({ adSlot, adFormat = 'auto', fullWidth = false }: AdBannerProps) {
useEffect(() => {
  try {
    if (typeof window !== "undefined") {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({})
    }
  } catch (e) {
    console.error(e)
  }
}, [])

  return (
    <div className={fullWidth ? 'w-full' : ''}>
      <ins
      key={adSlot}
        className="adsbygoogle"
        style={{
          display: 'block',
          textAlign: 'center',
          minHeight: '50px',
        }}
        data-ad-client="ca-pub-xxxxxxxxxxxxxxxx"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidth ? 'true' : 'false'}
      />
    </div>
  )
}