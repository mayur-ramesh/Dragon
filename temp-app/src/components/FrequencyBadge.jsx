const badgeStyles = {
  daily: { background: 'rgba(212,168,67,0.15)', color: '#a07c1a', border: '1px solid rgba(212,168,67,0.3)' },
  weekly: { background: 'rgba(106,170,122,0.15)', color: '#3a7a4a', border: '1px solid rgba(106,170,122,0.3)' },
  rarely: { background: 'rgba(158,155,170,0.15)', color: '#5a5768', border: '1px solid rgba(158,155,170,0.3)' },
}

export default function FrequencyBadge({ frequency }) {
  if (!frequency) return null
  const label = frequency.charAt(0).toUpperCase() + frequency.slice(1)
  return (
    <span style={{
      ...badgeStyles[frequency] || badgeStyles.rarely,
      padding: '2px 8px',
      borderRadius: 20,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.04em',
      fontFamily: 'Outfit, sans-serif',
    }}>
      {label}
    </span>
  )
}
