export default function QuestionList({ questions }) {
  return (
    <ol className="space-y-4">
      {questions.map((question, index) => (
        <li key={index} className="flex gap-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mcst-700 text-sm font-bold text-white">
            {index + 1}
          </span>
          <p className="pt-1 text-sm leading-relaxed text-slate-700">{question}</p>
        </li>
      ))}
    </ol>
  )
}
