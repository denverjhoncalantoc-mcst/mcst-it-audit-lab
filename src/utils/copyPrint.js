export async function copyToClipboard(text, onSuccess) {
  try {
    await navigator.clipboard.writeText(text)
    onSuccess?.()
    return true
  } catch {
    return false
  }
}

export function printContent(elementId) {
  const element = document.getElementById(elementId)
  if (!element) return
  const printWindow = window.open('', '_blank')
  if (!printWindow) return
  printWindow.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Print</title>
        <style>
          body { font-family: system-ui, sans-serif; padding: 24px; color: #1e293b; line-height: 1.6; }
          h1, h2, h3 { color: #1e40af; }
          table { border-collapse: collapse; width: 100%; margin: 12px 0; }
          th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: left; font-size: 14px; }
          th { background: #eff6ff; }
          .meta { font-size: 13px; color: #64748b; margin-bottom: 16px; }
        </style>
      </head>
      <body>${element.innerHTML}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.focus()
  printWindow.print()
}

export function formatSubmissionRequirements(items) {
  return [
    'Submission Requirements — Google Classroom',
    '',
    ...items.map((item, i) => `${i + 1}. ${item}`),
    '',
    'Prepare all outputs offline. This website is not a submission system.',
  ].join('\n')
}
