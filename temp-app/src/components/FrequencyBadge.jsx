const badgeStyles = {
  daily:  { background: 'rgba(200,136,26,0.14)', color: '#8a6010', border: '1px solid rgba(200,136,26,0.3)' },
  weekly: { background: 'rgba(30,140,92,0.12)',  color: '#156e46', border: '1px solid rgba(30,140,92,0.28)' },
  rarely: { background: 'rgba(140,120,100,0.12)', color: '#5a4e40', border: '1px solid rgba(140,120,100,0.25)' },
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
