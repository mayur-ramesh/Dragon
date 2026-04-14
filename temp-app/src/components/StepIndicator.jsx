export default function StepIndicator({ current, total = 6 }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => {
        const step = i + 1
        const isActive = step === current
        const isComplete = step < current
        return (
          <div
            key={i}
            style={{
              width: isActive ? 24 : 8,
              height: 8,
              borderRadius: 4,
              background: isActive ? '#1c0e06' : isComplete ? '#1e8c5c' : '#d8ccba',
              transition: 'all 0.3s ease',
            }}
          />
        )
      })}
    </div>
  )
}
