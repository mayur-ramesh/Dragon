import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { roles } from '../data/roleData'
import StepIndicator from '../components/StepIndicator'
import FrequencyBadge from '../components/FrequencyBadge'

const COLUMNS = [
  {
    id: 'automatable',
    label: 'Automatable',
    color: '#e07060',
    bg: 'rgba(224,112,96,0.06)',
    border: 'rgba(224,112,96,0.2)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    insight1: 'Routine tasks AI handles today',
    insight5: 'Fully automated — AI owns these',
  },
  {
    id: 'augmented',
    label: 'Augmented',
    color: '#d4a843',
    bg: 'rgba(212,168,67,0.06)',
    border: 'rgba(212,168,67,0.2)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="9" cy="12" r="6" /><circle cx="15" cy="12" r="6" />
      </svg>
    ),
    insight1: 'AI assists, you lead',
    insight5: 'You set direction, AI executes',
  },
  {
    id: 'human',
    label: 'Highly Human',
    color: '#6aaa7a',
    bg: 'rgba(106,170,122,0.06)',
    border: 'rgba(106,170,122,0.2)',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ),
    insight1: 'Irreplaceable human judgment',
    insight5: 'More critical than ever',
  },
]

const INSIGHTS = {
  1: 'Most of your work will evolve, not disappear.',
  3: 'Your daily routines shift — your judgment becomes more valuable.',
  5: 'Automation handles the repetitive. You handle the irreplaceable.',
}

function LoadingScreen({ onDone }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onDone, 200); return 100 }
        return prev + 4
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    'Reading your task frequency data...',
    'Mapping AI impact by category...',
    'Personalising your analysis...',
    'Generating your clarity report...',
  ]
  const currentStep = Math.min(Math.floor(progress / 25), 3)

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      background: '#faf9f7', gap: 0,
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ textAlign: 'center', maxWidth: 400 }}
      >
        {/* Spinner */}
        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 32px' }}>
          <motion.div
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%',
              border: '3px solid #e8e5e0', borderTopColor: '#1a1a2e',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <div style={{
            position: 'absolute', inset: 6, borderRadius: '50%',
            border: '2px solid #e8e5e0', borderTopColor: '#d4a843',
            animation: 'spin 1.5s linear infinite reverse',
          }} />
        </div>

        <h3 className="font-display" style={{ fontSize: 28, fontWeight: 400, color: '#1a1a2e', marginBottom: 16 }}>
          Analysing your week...
        </h3>
        <p style={{ color: '#9896a4', fontSize: 15, marginBottom: 32 }}>
          {steps[currentStep]}
        </p>

        {/* Progress bar */}
        <div style={{ width: '100%', height: 4, background: '#e8e5e0', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #1a1a2e, #d4a843)', borderRadius: 2 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <p style={{ marginTop: 8, fontSize: 12, color: '#c0bdb5' }}>{progress}%</p>
      </motion.div>
    </div>
  )
}

function TaskCard({ task, taskDetail, frequency, column }) {
  const [showDetail, setShowDetail] = useState(false)
  const col = COLUMNS.find(c => c.id === column)

  return (
    <motion.div
      layout
      layoutId={`task-${task.id}`}
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      onClick={() => setShowDetail(s => !s)}
      style={{
        background: '#fff',
        border: `1px solid ${col.border}`,
        borderRadius: 12,
        padding: '12px 14px',
        cursor: 'pointer',
        position: 'relative',
        marginBottom: 8,
      }}
      whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: '#1a1a2e', lineHeight: 1.3 }}>
          {task.name}
        </span>
        <FrequencyBadge frequency={frequency} />
      </div>

      <AnimatePresence>
        {showDetail && (
          <motion.p
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            style={{ fontSize: 12, color: '#6b6882', lineHeight: 1.5, overflow: 'hidden' }}
          >
            {taskDetail}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// Animated donut chart
function DonutChart({ data, size = 120 }) {
  const total = data.reduce((s, d) => s + d.value, 0)
  const radius = 42
  const cx = size / 2
  const cy = size / 2
  const circumference = 2 * Math.PI * radius
  let cumulative = 0

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {data.map((d, i) => {
        const pct = total > 0 ? d.value / total : 0
        const dashArray = `${pct * circumference} ${circumference}`
        const rotation = -90 + (cumulative / total) * 360
        cumulative += d.value
        return (
          <motion.circle
            key={i}
            cx={cx} cy={cy} r={radius}
            fill="none"
            stroke={d.color}
            strokeWidth={14}
            strokeDasharray={dashArray}
            transform={`rotate(${rotation} ${cx} ${cy})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: 'easeOut' }}
          />
        )
      })}
      <circle cx={cx} cy={cy} r={34} fill="#faf9f7" />
    </svg>
  )
}

export default function Screen3Dashboard({ roleKey, taskFrequencies, sliderYear, setSliderYear, onNext, onBack }) {
  const [loading, setLoading] = useState(true)
  const roleData = roles[roleKey]

  const analysisKey = sliderYear <= 2 ? 'year1' : 'year5'
  const analysis = roleData.aiAnalysis[analysisKey]

  // Build lookup: taskId -> category for current year
  const taskCategoryMap = {}
  const taskDetailMap = {}
  ;['automatable', 'augmented', 'human'].forEach(cat => {
    analysis[cat].forEach(item => {
      taskCategoryMap[item.id] = cat
      taskDetailMap[item.id] = item.detail
    })
  })

  // Build enriched task lists per column
  function getColumnTasks(colId) {
    return (analysis[colId] || []).map(item => ({
      task: roleData.taskPool.find(t => t.id === item.id),
      detail: item.detail,
      frequency: taskFrequencies[item.id] || 'weekly',
    })).filter(x => x.task)
  }

  const donutData = COLUMNS.map(col => ({
    color: col.color,
    value: (analysis[col.id] || []).length,
  }))

  // Count daily augmented tasks
  const dailyAugmented = (analysis.augmented || []).filter(item => taskFrequencies[item.id] === 'daily').length
  const totalDaily = Object.values(taskFrequencies).filter(f => f === 'daily').length

  const sliderPositionPct = ((sliderYear - 1) / 4) * 100

  const insightKey = sliderYear <= 1 ? 1 : sliderYear <= 3 ? 3 : 5

  if (loading) return <LoadingScreen onDone={() => setLoading(false)} />

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f7', padding: '24px 32px 60px' }}>
      {/* Top nav */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28, maxWidth: 1280, margin: '0 auto 28px' }}>
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
          <StepIndicator current={3} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#1a1a2e', color: '#faf9f7',
          padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 600,
        }}>
          {roleData.title}
          <span style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 100, fontSize: 12 }}>
            {roleData.industry}
          </span>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 36 }}
        >
          <h2 className="font-display" style={{ fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, color: '#1a1a2e', marginBottom: 10 }}>
            Based on your Tuesday, here's how AI reshapes your work.
          </h2>
          <p style={{ color: '#9896a4', fontSize: 15 }}>
            Click any task card to see the AI impact detail. Drag the slider to see the 5-year shift.
          </p>
        </motion.div>

        {/* Timeline Slider */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            background: '#fff',
            border: '1px solid #e8e5e0',
            borderRadius: 16,
            padding: '24px 32px',
            marginBottom: 28,
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Timeline
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={insightKey}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                style={{ fontSize: 14, color: '#6b6882', fontWeight: 400, fontStyle: 'italic' }}
              >
                "{INSIGHTS[insightKey]}"
              </motion.span>
            </AnimatePresence>
          </div>
          <div style={{ position: 'relative', padding: '4px 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: 13, color: '#9896a4', fontWeight: 600 }}>Now → 1 year</span>
              <span style={{ fontSize: 13, color: '#9896a4', fontWeight: 600 }}>3–5 years</span>
            </div>
            <div style={{ position: 'relative' }}>
              <div style={{ height: 6, background: 'linear-gradient(90deg, #6aaa7a, #d4a843, #e07060)', borderRadius: 3 }} />
              <input
                type="range"
                min={1}
                max={5}
                step={1}
                value={sliderYear}
                onChange={e => setSliderYear(Number(e.target.value))}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  cursor: 'pointer',
                  margin: 0,
                  top: '-8px',
                  height: '24px',
                }}
              />
              {/* Custom thumb */}
              <motion.div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${sliderPositionPct}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: '#1a1a2e',
                  border: '3px solid #fff',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                  pointerEvents: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                animate={{ left: `${sliderPositionPct}%` }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                {/* Year label above */}
                <div style={{
                  position: 'absolute',
                  top: -28,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#1a1a2e',
                  color: '#fff',
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '3px 7px',
                  borderRadius: 6,
                  whiteSpace: 'nowrap',
                }}>
                  Year {sliderYear}
                </div>
              </motion.div>
            </div>
            {/* Year markers */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14, paddingTop: 4 }}>
              {[1,2,3,4,5].map(y => (
                <button
                  key={y}
                  onClick={() => setSliderYear(y)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 12, fontFamily: 'Outfit, sans-serif',
                    fontWeight: sliderYear === y ? 700 : 400,
                    color: sliderYear === y ? '#1a1a2e' : '#b0adb8',
                    padding: '2px 4px',
                  }}
                >
                  Y{y}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Three columns */}
        <LayoutGroup>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 28 }}>
            {COLUMNS.map((col, ci) => {
              const colTasks = getColumnTasks(col.id)
              return (
                <motion.div
                  key={col.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: ci * 0.1 }}
                  style={{
                    background: col.bg,
                    border: `1.5px solid ${col.border}`,
                    borderRadius: 16,
                    padding: 20,
                    minHeight: 300,
                  }}
                >
                  {/* Column header */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <div style={{
                      color: col.color,
                      width: 32, height: 32,
                      background: `${col.color}18`,
                      borderRadius: 8,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      {col.icon}
                    </div>
                    <div>
                      <h3 style={{ fontSize: 15, fontWeight: 700, color: col.color, margin: 0 }}>{col.label}</h3>
                    </div>
                    <div style={{
                      marginLeft: 'auto',
                      background: col.color,
                      color: '#fff',
                      borderRadius: 100,
                      width: 24, height: 24,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, fontWeight: 700,
                    }}>
                      {colTasks.length}
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: '#9896a4', marginBottom: 16, fontStyle: 'italic' }}>
                    {sliderYear <= 2 ? col.insight1 : col.insight5}
                  </p>

                  {/* Task cards */}
                  <AnimatePresence>
                    {colTasks.map(({ task, detail, frequency }) => (
                      <TaskCard
                        key={task.id}
                        task={task}
                        taskDetail={detail}
                        frequency={frequency}
                        column={col.id}
                      />
                    ))}
                  </AnimatePresence>

                  {colTasks.length === 0 && (
                    <div style={{
                      textAlign: 'center', padding: '32px 16px',
                      color: '#c0bdb5', fontSize: 13,
                    }}>
                      No tasks in this category
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </LayoutGroup>

        {/* Summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            background: '#fff',
            border: '1px solid #e8e5e0',
            borderRadius: 16,
            padding: '24px 32px',
            display: 'flex',
            alignItems: 'center',
            gap: 40,
            marginBottom: 28,
          }}
        >
          <DonutChart
            data={donutData}
            size={110}
          />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', gap: 24, marginBottom: 16, flexWrap: 'wrap' }}>
              {COLUMNS.map((col, i) => (
                <div key={col.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: col.color }} />
                  <span style={{ fontSize: 13, color: '#6b6882' }}>
                    <strong style={{ color: '#1a1a2e' }}>{donutData[i].value}</strong> {col.label}
                  </span>
                </div>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={`${analysisKey}-${dailyAugmented}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                style={{ fontSize: 14, color: '#6b6882', lineHeight: 1.6 }}
              >
                <span style={{ color: '#d4a843', fontWeight: 700 }}>
                  {dailyAugmented} of your daily tasks
                </span>
                {' '}will be augmented — not replaced — {sliderYear <= 2 ? 'within 2 years' : 'within 5 years'}.
                {totalDaily > 0 && ` That's ${Math.round((dailyAugmented / totalDaily) * 100)}% of what you do every day.`}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* CTA */}
        <div style={{ textAlign: 'right' }}>
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.02, backgroundColor: '#252545' }}
            whileTap={{ scale: 0.98 }}
            style={{
              padding: '14px 32px',
              fontSize: 15,
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              background: '#1a1a2e',
              color: '#faf9f7',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              letterSpacing: '0.01em',
            }}
          >
            See my AI-proof moves →
          </motion.button>
        </div>
      </div>
    </div>
  )
}
