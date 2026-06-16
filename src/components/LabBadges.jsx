const typeBadges = {
  guided: { label: 'Guided Investigation', className: 'bg-mcst-100 text-mcst-800' },
  project: { label: 'Project Lab', className: 'bg-violet-100 text-violet-800' },
  evidence: { label: 'Evidence Review', className: 'bg-teal-100 text-teal-800' },
  hitl: { label: 'HITL Required', className: 'bg-indigo-100 text-indigo-800' },
  classroom: { label: 'Google Classroom Submission', className: 'bg-amber-100 text-amber-900' },
  final: { label: 'Final Project', className: 'bg-rose-100 text-rose-800' },
}

export default function LabBadges({ lab }) {
  const badges = ['guided', 'evidence', 'hitl', 'classroom']
  if (lab.type === 'project') {
    badges[0] = 'project'
  }
  if (lab.id >= 9) {
    badges.push('final')
  }

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((key) => {
        const badge = typeBadges[key]
        return (
          <span
            key={key}
            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}
          >
            {badge.label}
          </span>
        )
      })}
    </div>
  )
}

export function Badge({ type }) {
  const badge = typeBadges[type]
  if (!badge) return null
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${badge.className}`}>
      {badge.label}
    </span>
  )
}
