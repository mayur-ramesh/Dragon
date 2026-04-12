export default function StepIndicator({ current, total = 5 }) {
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
              background: isActive ? '#1a1a2e' : isComplete ? '#6aaa7a' : '#d6d3cc',
              transition: 'all 0.3s ease',
            }}
          />
        )
      })}
    </div>
  )
}
