import { useState } from 'react'

export default function CopyPrintButtons({ copyText, printTargetId, copyLabel = 'Copy', printLabel = 'Print' }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (!copyText) return
    try {
      await navigator.clipboard.writeText(copyText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {copyText && (
        <button
          type="button"
          onClick={handleCopy}
          className="rounded-lg border border-mcst-300 bg-white px-4 py-2 text-sm font-medium text-mcst-700 transition-colors hover:bg-mcst-50"
        >
          {copied ? 'Copied!' : copyLabel}
        </button>
      )}
      {printTargetId && (
        <button
          type="button"
          onClick={() => {
            const el = document.getElementById(printTargetId)
            if (!el) return
            const w = window.open('', '_blank')
            if (!w) return
            w.document.write(`<!DOCTYPE html><html><head><title>Print</title><style>body{font-family:system-ui,sans-serif;padding:24px;color:#1e293b;line-height:1.6}h1,h2,h3{color:#1e40af}</style></head><body>${el.innerHTML}</body></html>`)
            w.document.close()
            w.focus()
            w.print()
          }}
          className="rounded-lg bg-mcst-700 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-mcst-800"
        >
          {printLabel}
        </button>
      )}
    </div>
  )
}
