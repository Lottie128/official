interface StatCardProps {
  number: string
  label: string
}

export function StatCard({ number, label }: StatCardProps) {
  return (
    <div className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg p-4 text-center border border-gray-200 dark:border-gray-700">
      <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">{number}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  )
}
