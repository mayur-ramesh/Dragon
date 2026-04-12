import { motion } from 'framer-motion'
import { roles } from '../data/roleData'
import StepIndicator from '../components/StepIndicator'

const TIMELINE_PHASES = [
  { range: 'Month 1–3', label: 'Foundation moves',      moveIndex: 0, color: '#1e8c5c' },
  { range: 'Month 4–6', label: 'Build leverage',        moveIndex: 1, color: '#c8881a' },
  { range: 'Month 7–12', label: 'Position for the shift', moveIndex: 2, color: '#c8341a' },
]

function MoveCard({ move, taskFrequencies, allTasks, index }) {
  const linkedTask = allTasks.find(t => t.id === move.linkedTaskId)
  const freq = taskFrequencies[move.linkedTaskId]

  const accentColors  = ['#1e8c5c', '#c8881a', '#c8341a']
  const bgColors      = ['rgba(30,140,92,0.05)', 'rgba(200,136,26,0.05)', 'rgba(200,52,26,0.05)']
  const borderColors  = ['rgba(30,140,92,0.18)', 'rgba(200,136,26,0.18)', 'rgba(200,52,26,0.18)']
  const accent = accentColors[index]
  const bg     = bgColors[index]
  const border = borderColors[index]

  const freqBg    = freq === 'daily' ? 'rgba(200,136,26,0.14)' : freq === 'weekly' ? 'rgba(30,140,92,0.12)' : 'rgba(140,120,100,0.12)'
  const freqColor = freq === 'daily' ? '#8a6010' : freq === 'weekly' ? '#156e46' : '#5a4e40'

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.15, duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ background: '#fff', border: `1.5px solid ${border}`, borderRadius: 20, padding: 32, position: 'relative', overflow: 'hidden' }}
    >
      {/* Accent stripe */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 5, background: accent, borderRadius: '20px 0 0 20px' }} />

      {/* Watermark number */}
      <div style={{
        fontSize: 64, fontWeight: 700, lineHeight: 1,
        color: `${accent}18`, fontFamily: 'Instrument Serif, serif',
        position: 'absolute', top: 16, right: 24, userSelect: 'none',
      }}>
        {move.number}
      </div>

      <div style={{ marginBottom: 16 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          background: bg, border: `1px solid ${border}`,
          borderRadius: 100, padding: '4px 12px', marginBottom: 12,
        }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: accent, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Move {move.number}
          </span>
        </div>
        <h3 className="font-display" style={{ fontSize: 24, fontWeight: 400, color: '#1c0e06', lineHeight: 1.25 }}>
          {move.title}
        </h3>
      </div>

      <p style={{ fontSize: 15, color: '#4a3e30', lineHeight: 1.7, marginBottom: 20 }}>{move.why}</p>

      {linkedTask && (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#f5ecd8', border: '1px solid #e0d4c0',
          borderRadius: 100, padding: '5px 12px', marginBottom: 20,
          fontSize: 13, color: '#6b5f4e',
        }}>
          <span style={{ color: accent }}>↗</span>
          From: <strong style={{ color: '#1c0e06' }}>{move.linkedTaskName}</strong>
          {freq && (
            <span style={{ background: freqBg, color: freqColor, padding: '1px 7px', borderRadius: 100, fontSize: 11, fontWeight: 600 }}>
              {freq}
            </span>
          )}
        </div>
      )}

      <div style={{ background: '#f8f2e8', border: '1px solid #ede0cc', borderRadius: 14, padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
          <div>
            <p style={{ fontSize: 12, fontWeight: 700, color: '#9a8b78', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
              Supporting skill-up
            </p>
            <p style={{ fontSize: 15, fontWeight: 600, color: '#1c0e06', marginBottom: 4 }}>{move.course.name}</p>
            <p style={{ fontSize: 13, color: '#6b5f4e' }}>{move.course.provider} · {move.course.duration}</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8, flexShrink: 0 }}>
            {move.course.skillsFuture && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                background: 'rgba(30,140,92,0.1)', border: '1px solid rgba(30,140,92,0.25)',
                color: '#156e46', borderRadius: 100, padding: '4px 10px', fontSize: 11, fontWeight: 700,
              }}>
                ✓ SkillsFuture Credit Eligible
              </div>
            )}
            <button style={{
              background: 'transparent', border: '1.5px solid #ddd0bc',
              borderRadius: 10, padding: '7px 14px', fontSize: 13,
              fontFamily: 'Outfit, sans-serif', fontWeight: 500,
              color: '#1c0e06', cursor: 'pointer',
            }}>
              View on SkillsFuture →
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Screen4Moves({ roleKey, taskFrequencies, onNext, onBack }) {
  const roleData = roles[roleKey]

  return (
    <div style={{ minHeight: '100vh', background: '#fdf9f2', padding: '24px 32px 60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1100, margin: '0 auto 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: '1.5px solid #e0d4c0', borderRadius: 10,
            padding: '8px 14px', cursor: 'pointer', fontSize: 14, color: '#6b5f4e',
            fontFamily: 'Outfit, sans-serif', fontWeight: 500,
          }}>
            ← Back
          </button>
          <StepIndicator current={4} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#1c0e06', color: '#fdf9f2',
          padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 600,
        }}>
          {roleData.title}
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 48 }}>
          <h2 className="font-display" style={{
            fontSize: 'clamp(30px, 3.5vw, 48px)', fontWeight: 400, color: '#1c0e06',
            marginBottom: 12, lineHeight: 1.15,
          }}>
            Your 3 AI-proof moves.
          </h2>
          <p style={{ fontSize: 16, color: '#6b5f4e', lineHeight: 1.6, maxWidth: 560 }}>
            Strategic shifts to make in the next 12 months — based on your role and your week.
          </p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
          {roleData.moves.map((move, i) => (
            <MoveCard key={move.number} move={move} taskFrequencies={taskFrequencies} allTasks={roleData.taskPool} index={i} />
          ))}
        </div>

        {/* 12-month timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
          style={{ background: '#fff', border: '1px solid #ede0cc', borderRadius: 20, padding: '28px 32px', marginBottom: 36 }}
        >
          <h4 style={{ fontSize: 13, fontWeight: 700, color: '#9a8b78', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 24 }}>
            Your 12-Month Roadmap
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, position: 'relative' }}>
            <div style={{
              position: 'absolute', top: 16, left: '16.67%', right: '16.67%',
              height: 2, background: 'linear-gradient(90deg, #1e8c5c, #c8881a, #c8341a)', zIndex: 0,
            }} />
            {TIMELINE_PHASES.map((phase, i) => (
              <div key={i} style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%',
                  background: phase.color, color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 700, margin: '0 auto 12px',
                  border: '3px solid #fdf9f2', boxShadow: `0 0 0 2px ${phase.color}`,
                }}>
                  {i + 1}
                </div>
                <p style={{ fontSize: 12, fontWeight: 700, color: phase.color, marginBottom: 4 }}>{phase.range}</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1c0e06', marginBottom: 6 }}>{phase.label}</p>
                <p style={{ fontSize: 13, color: '#9a8b78', lineHeight: 1.4 }}>
                  {roleData.moves[phase.moveIndex]?.title}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <div style={{ textAlign: 'right' }}>
          <motion.button onClick={onNext}
            whileHover={{ scale: 1.02, backgroundColor: '#2e1a0c' }} whileTap={{ scale: 0.98 }}
            style={{
              padding: '14px 32px', fontSize: 15, fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              background: '#1c0e06', color: '#fdf9f2', border: 'none', borderRadius: 12,
              cursor: 'pointer', letterSpacing: '0.01em',
            }}>
            See my clarity summary →
          </motion.button>
        </div>
      </div>
    </div>
  )
}
