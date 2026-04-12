import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { roles } from '../data/roleData'
import StepIndicator from '../components/StepIndicator'

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    const start = Date.now()
    const tick = () => {
      const elapsed = Date.now() - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration])
  return count
}

function CircularProgress({ score }) {
  const animatedScore = useCountUp(score, 1600)
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const pct = animatedScore / 100
  const dashArray = `${pct * circumference} ${circumference}`

  const color = score >= 70 ? '#6aaa7a' : score >= 50 ? '#d4a843' : '#e07060'
  const label = score >= 70 ? 'Future-Ready' : score >= 50 ? 'Evolving' : 'At Risk'

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={radius} fill="none" stroke="#e8e5e0" strokeWidth="12" />
        <motion.circle
          cx="70" cy="70" r={radius}
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeLinecap="round"
          strokeDasharray={dashArray}
          transform="rotate(-90 70 70)"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: dashArray }}
          transition={{ duration: 1.6, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </svg>
      <div style={{ position: 'absolute', textAlign: 'center' }}>
        <div style={{ fontSize: 32, fontWeight: 700, color: '#1a1a2e', lineHeight: 1 }}>
          {animatedScore}%
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color, marginTop: 4 }}>
          {label}
        </div>
      </div>
    </div>
  )
}

function MiniDonut({ data, size = 80 }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const radius = 28
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * radius
  let cumulative = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const pct = total > 0 ? d.value / total : 0
        const dashArray = `${pct * circumference} ${circumference}`
        const rotation = -90 + (cumulative / Math.max(total, 1)) * 360
        cumulative += d.value
        return (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth={10}
            strokeDasharray={dashArray}
            transform={`rotate(${rotation} ${cx} ${cy})`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: dashArray }}
            transition={{ duration: 0.7, delay: i * 0.12 }}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={22} fill="#faf9f7" />
    </svg>
  )
}

export default function Screen5Summary({ roleKey, taskFrequencies, onRestart, onBack }) {
  const roleData = roles[roleKey]
  const [toastVisible, setToastVisible] = useState(false)

  const year1 = roleData.aiAnalysis.year1
  const automatableCount = year1.automatable.length
  const augmentedCount = year1.augmented.length
  const humanCount = year1.human.length

  const donutData = [
    { color: '#e07060', value: automatableCount, label: 'Automatable' },
    { color: '#d4a843', value: augmentedCount, label: 'Augmented' },
    { color: '#6aaa7a', value: humanCount, label: 'Highly Human' },
  ]

  const dailyAugmented = year1.augmented.filter(item => taskFrequencies[item.id] === 'daily').length
  const totalTasks = automatableCount + augmentedCount + humanCount

  function handleShare() {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2500)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f7', padding: '24px 32px 60px' }}>
      {/* Top nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, maxWidth: 900, margin: '0 auto 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={onBack}
            style={{
              background: 'transparent', border: '1.5px solid #e0ddd5', borderRadius: 10,
              padding: '8px 14px', cursor: 'pointer', fontSize: 14, color: '#6b6882',
              fontFamily: 'Outfit, sans-serif', fontWeight: 500,
            }}
          >
            ← Back
          </button>
          <StepIndicator current={5} />
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Main card — screenshot-worthy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            background: '#fff',
            border: '1.5px solid #e8e5e0',
            borderRadius: 24,
            padding: '48px',
            marginBottom: 24,
            boxShadow: '0 4px 40px rgba(26,26,46,0.06)',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#1a1a2e', color: '#faf9f7',
                padding: '6px 16px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                marginBottom: 16,
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#6aaa7a' }} />
                AI Career Clarity Report
              </div>
              <h1 className="font-display" style={{
                fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 400, color: '#1a1a2e',
                lineHeight: 1.15, marginBottom: 8,
              }}>
                {roleData.title}
              </h1>
              <p style={{ fontSize: 15, color: '#9896a4' }}>
                Singapore · {roleData.industry}
              </p>
            </div>
            <CircularProgress score={roleData.clarityScore} />
          </div>

          {/* Pull quote */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            style={{
              borderLeft: '4px solid #d4a843',
              paddingLeft: 24,
              marginBottom: 40,
            }}
          >
            <p className="font-display" style={{
              fontSize: 20, color: '#1a1a2e', lineHeight: 1.55,
              fontStyle: 'italic', fontWeight: 400,
            }}>
              "{roleData.summaryInsight}"
            </p>
            <p style={{ fontSize: 13, color: '#9896a4', marginTop: 8 }}>
              Based on your current role and work patterns
            </p>
          </motion.div>

          {/* Two columns: donut + moves */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: 32, marginBottom: 40 }}>
            {/* Your week at a glance */}
            <div style={{ background: '#f8f7f5', borderRadius: 16, padding: 24 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: '#9896a4', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Your week at a glance
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                <MiniDonut data={donutData} size={90} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {donutData.map(d => (
                    <div key={d.label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: '#4a4758' }}>
                        <strong style={{ color: '#1a1a2e' }}>{Math.round((d.value / totalTasks) * 100)}%</strong>
                        {' '}{d.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Your 3 moves */}
            <div style={{ background: '#f8f7f5', borderRadius: 16, padding: 24 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: '#9896a4', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 16 }}>
                Your 3 AI-proof moves
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {roleData.moves.map((move, i) => {
                  const colors = ['#6aaa7a', '#d4a843', '#e07060']
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + i * 0.12 }}
                      style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}
                    >
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        background: colors[i], color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 1,
                      }}>
                        {i + 1}
                      </div>
                      <p style={{ fontSize: 14, color: '#1a1a2e', lineHeight: 1.4, fontWeight: 500 }}>
                        {move.title}
                      </p>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Key stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { value: `${humanCount}`, label: 'Highly Human tasks', sub: 'Irreplaceable right now', color: '#6aaa7a' },
              { value: `${augmentedCount}`, label: 'Tasks being augmented', sub: 'AI assists, you lead', color: '#d4a843' },
              { value: `${dailyAugmented}`, label: 'Daily tasks evolving', sub: 'Not disappearing — shifting', color: '#1a1a2e' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                style={{
                  background: `${stat.color}08`,
                  border: `1px solid ${stat.color}25`,
                  borderRadius: 12,
                  padding: '16px 20px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 36, fontWeight: 700, color: stat.color, lineHeight: 1, marginBottom: 6 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', marginBottom: 3 }}>{stat.label}</div>
                <div style={{ fontSize: 12, color: '#9896a4' }}>{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 24 }}>
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '14px 28px',
              fontSize: 15,
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              background: '#1a1a2e',
              color: '#faf9f7',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Share my results
          </motion.button>

          <motion.button
            onClick={onRestart}
            whileHover={{ scale: 1.02, borderColor: '#1a1a2e', color: '#1a1a2e' }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '14px 28px',
              fontSize: 15,
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              background: 'transparent',
              color: '#6b6882',
              border: '1.5px solid #ddd9d1',
              borderRadius: 12,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            Explore another role →
          </motion.button>
        </div>

        {/* Footer */}
        <p style={{ textAlign: 'center', fontSize: 13, color: '#c0bdb5' }}>
          Powered by AI Career Clarity · Built for Singapore professionals
        </p>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            style={{
              position: 'fixed',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#1a1a2e',
              color: '#faf9f7',
              padding: '12px 24px',
              borderRadius: 12,
              fontSize: 14,
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              zIndex: 999,
              boxShadow: '0 8px 32px rgba(26,26,46,0.2)',
            }}
          >
            <span style={{ color: '#6aaa7a' }}>✓</span>
            Link copied to clipboard!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
