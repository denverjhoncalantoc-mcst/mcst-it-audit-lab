export default function EvidenceBox({ items }) {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-start gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3"
        >
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mcst-100 text-xs font-bold text-mcst-700">
            {index + 1}
          </span>
          <span className="text-sm leading-relaxed text-slate-700">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function EvidenceTextBox({ title, content }) {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
      {title && (
        <h4 className="mb-2 text-sm font-semibold text-amber-900">{title}</h4>
      )}
      <p className="whitespace-pre-line text-sm leading-relaxed text-amber-800">
        {content}
      </p>
    </div>
  )
}
