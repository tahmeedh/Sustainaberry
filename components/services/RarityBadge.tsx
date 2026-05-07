const BADGE: Record<string, { bg: string; color: string; icon: string }> = {
  'Organic': { bg: 'rgba(34,197,94,0.15)', color: '#16A34A', icon: '🌿' },
  'Fresh Picked': { bg: 'rgba(233,30,140,0.12)', color: '#C01070', icon: '🍓' },
  'Carbon Neutral': { bg: 'rgba(56,189,248,0.15)', color: '#0EA5E9', icon: '♻️' },
}

export default function RarityBadge({ label }: { label: string }) {
  const s = BADGE[label] ?? { bg: '#f3f4f6', color: '#6b7280', icon: '✓' }
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
      style={{ backgroundColor: s.bg, color: s.color, border: `2px solid ${s.color}`, fontFamily: 'Nunito, sans-serif' }}>
      {s.icon} {label}
    </span>
  )
}
