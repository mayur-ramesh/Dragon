import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { matchRole, matchSampleFromUrl, parseJobListing, addDynamicRole } from '../data/roleData'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

const INDUSTRIES = ['Fintech', 'Healthcare', 'Logistics', 'Marketing', 'Education', 'Tech', 'Creative & Media']

function BackgroundLines() {
  const lines = Array.from({ length: 12 }, (_, i) => i)
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {lines.map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: `linear-gradient(90deg, transparent, rgba(28,14,6,0.05), transparent)`,
            height: 1,
            width: '60%',
            left: `${(i * 13) % 60}%`,
            top: `${8 + i * 8}%`,
          }}
          animate={{ x: ['-10%', '15%', '-10%'], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 8 + i * 1.3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.6 }}
        />
      ))}
      {[0,1,2].map((i) => (
        <motion.div
          key={`circle-${i}`}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '1px solid rgba(200,136,26,0.08)',
            width: 300 + i * 200,
            height: 300 + i * 200,
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}
      {[0,1,2,3,4,5,6,7].map((i) => (
        <motion.div
          key={`orb-${i}`}
          style={{
            position: 'absolute',
            width: 3 + (i % 3),
            height: 3 + (i % 3),
            borderRadius: '50%',
            background: `rgba(200,136,26,${0.35 + (i % 4) * 0.15})`,
            left: `${8 + i * 11}%`,
            bottom: `${5 + (i % 4) * 6}%`,
            filter: 'blur(0.5px)',
            boxShadow: '0 0 6px rgba(200,136,26,0.4)',
          }}
          animate={{
            y: [0, -(120 + i * 18)],
            x: [(i % 2 === 0 ? 0 : 0), (i % 2 === 0 ? 12 : -12), (i % 2 === 0 ? -6 : 6)],
            opacity: [0, 0.9, 0.6, 0],
          }}
          transition={{
            duration: 5 + i * 0.9,
            repeat: Infinity,
            delay: i * 0.65,
            ease: 'easeOut',
            times: [0, 0.3, 0.7, 1],
          }}
        />
      ))}
    </div>
  )
}

/* ── Simulated fetch loading overlay ── */
function FetchingOverlay({ url, onDone }) {
  const [progress, setProgress] = useState(0)
  const isIndeed = url.toLowerCase().includes('indeed')
  const platformName = isIndeed ? 'Indeed' : 'LinkedIn'

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setTimeout(onDone, 300); return 100 }
        return prev + Math.random() * 12 + 3
      })
    }, 180)
    return () => clearInterval(interval)
  }, [])

  const steps = [
    `Connecting to ${platformName}...`,
    'Reading job description...',
    'Extracting responsibilities...',
    'Classifying tasks by AI impact...',
    'Building your analysis...',
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 100,
        background: 'rgba(253,249,242,0.95)', backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', maxWidth: 420 }}>
        {/* Spinning rings */}
        <div style={{ position: 'relative', width: 72, height: 72, margin: '0 auto 28px' }}>
          <motion.div
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid #ede0cc', borderTopColor: '#1c0e06' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            style={{ position: 'absolute', inset: 6, borderRadius: '50%', border: '2px solid #ede0cc', borderTopColor: '#c8881a' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <h3 className="font-display" style={{ fontSize: 26, fontWeight: 400, color: '#1c0e06', marginBottom: 12 }}>
          Importing from {platformName}
        </h3>
        <p style={{ color: '#9a8b78', fontSize: 14, marginBottom: 28 }}>
          {steps[Math.min(Math.floor(Math.min(progress, 99) / 20), 4)]}
        </p>

        <div style={{ width: '100%', height: 4, background: '#ede0cc', borderRadius: 2, overflow: 'hidden' }}>
          <motion.div
            style={{ height: '100%', background: 'linear-gradient(90deg, #1c0e06, #c8881a)', borderRadius: 2 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 0.15 }}
          />
        </div>
        <p style={{ marginTop: 8, fontSize: 12, color: '#bfb09c' }}>{Math.min(Math.round(progress), 100)}%</p>
      </motion.div>
    </motion.div>
  )
}

/* ── Parsed job preview before continuing ── */
function ParsedJobPreview({ sample, onConfirm, onBack, isMobile }) {
  const tasks = sample.description
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('•') || l.startsWith('-') || l.startsWith('*'))
    .map(l => l.replace(/^[\s•\-\*]+\s*/, '').trim())
    .filter(l => l.length > 8)
    .slice(0, 10)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
      style={{ width: '100%', maxWidth: 620, margin: '0 auto' }}
    >
      {/* Header card */}
      <div style={{
        background: '#fff', border: '1.5px solid #ede0cc', borderRadius: 20,
        padding: isMobile ? '24px 20px' : '32px', marginBottom: 20,
        boxShadow: '0 4px 32px rgba(28,14,6,0.06)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
          <div style={{
            background: '#1e8c5c', color: '#fff', width: 36, height: 36, borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>✓</div>
          <div>
            <p style={{ fontSize: 13, color: '#1e8c5c', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Job listing imported
            </p>
            <p style={{ fontSize: 12, color: '#9a8b78' }}>We extracted {tasks.length} responsibilities</p>
          </div>
        </div>

        <div style={{
          background: '#f8f2e8', borderRadius: 14, padding: '20px 24px', marginBottom: 20,
        }}>
          <h3 className="font-display" style={{ fontSize: 22, fontWeight: 400, color: '#1c0e06', marginBottom: 6 }}>
            {sample.title}
          </h3>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <span style={{
              background: 'rgba(200,136,26,0.14)', color: '#8a6010',
              padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600,
            }}>
              {sample.industry}
            </span>
            <span style={{
              background: 'rgba(28,14,6,0.08)', color: '#6b5f4e',
              padding: '3px 10px', borderRadius: 100, fontSize: 12, fontWeight: 600,
            }}>
              🇸🇬 Singapore
            </span>
          </div>
        </div>

        {/* Task preview */}
        <p style={{ fontSize: 12, fontWeight: 700, color: '#9a8b78', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12 }}>
          Extracted tasks
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          {tasks.map((task, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: 10,
                padding: '8px 12px', background: '#fdf9f2',
                borderRadius: 10, border: '1px solid #ede0cc',
              }}
            >
              <span style={{ color: '#c8881a', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{ fontSize: 13, color: '#4a3e30', lineHeight: 1.4 }}>{task}</span>
            </motion.div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button
            onClick={onBack}
            style={{
              flex: 1, padding: '14px 20px', fontSize: 14,
              fontFamily: 'Outfit, sans-serif', fontWeight: 500,
              background: 'transparent', border: '1.5px solid #ddd0bc',
              borderRadius: 12, color: '#6b5f4e', cursor: 'pointer',
            }}
          >
            ← Try different URL
          </button>
          <div style={{ position: 'relative', flex: 2 }}>
            <motion.div
              style={{ position: 'absolute', inset: -1, borderRadius: 13, pointerEvents: 'none' }}
              animate={{ boxShadow: ['0 0 0 0 rgba(200,136,26,0)', '0 0 22px 5px rgba(200,136,26,0.28)', '0 0 0 0 rgba(200,136,26,0)'] }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.button
              onClick={onConfirm}
              whileHover={{ scale: 1.02, backgroundColor: '#2e1a0c' }}
              whileTap={{ scale: 0.98 }}
              style={{
                width: '100%', padding: '14px 24px', fontSize: 15,
                fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                background: '#1c0e06', color: '#fdf9f2',
                border: 'none', borderRadius: 12, cursor: 'pointer',
              }}
            >
              Analyse this role →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Screen1Onboarding({ onNext }) {
  const [mode, setMode] = useState('role') // 'role' | 'url'
  const [role, setRole] = useState('')
  const [industry, setIndustry] = useState('Fintech')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)
  const isMobile = useIsMobile()

  // URL import state
  const [jobUrl, setJobUrl] = useState('')
  const [urlFocused, setUrlFocused] = useState(false)
  const [urlError, setUrlError] = useState('')
  const [fetching, setFetching] = useState(false)
  const [fetchedSample, setFetchedSample] = useState(null)

  const stagger = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  function handleSubmit(e) {
    e.preventDefault()
    if (!role.trim()) { setError(true); return }
    onNext(matchRole(role.trim()))
  }

  function handleUrlSubmit(e) {
    e.preventDefault()
    const url = jobUrl.trim()
    if (!url) { setUrlError('Please paste a job listing URL.'); return }
    if (!url.startsWith('http')) { setUrlError('Please enter a valid URL starting with http.'); return }
    setUrlError('')
    setFetching(true)
  }

  function handleFetchDone() {
    const sample = matchSampleFromUrl(jobUrl.trim())
    setFetching(false)
    setFetchedSample(sample)
  }

  function handleConfirmImport() {
    if (!fetchedSample) return
    const roleObj = parseJobListing(fetchedSample.title, fetchedSample.industry, fetchedSample.description)
    if (!roleObj) return
    const key = addDynamicRole(roleObj)
    onNext(key)
  }

  function handleBackFromPreview() {
    setFetchedSample(null)
    setJobUrl('')
  }

  const tabStyle = (active) => ({
    flex: 1, padding: '12px 16px', fontSize: 14,
    fontFamily: 'Outfit, sans-serif', fontWeight: active ? 700 : 500,
    background: active ? '#1c0e06' : 'transparent',
    color: active ? '#fdf9f2' : '#6b5f4e',
    border: active ? '1.5px solid #1c0e06' : '1.5px solid #ddd0bc',
    borderRadius: 10, cursor: 'pointer',
    transition: 'all 0.25s ease',
  })

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#fdf9f2',
      padding: isMobile ? '32px 16px' : '40px 24px',
    }}>
      <BackgroundLines />

      {/* Fetching overlay */}
      <AnimatePresence>
        {fetching && <FetchingOverlay url={jobUrl} onDone={handleFetchDone} />}
      </AnimatePresence>

      <motion.div
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 620, textAlign: 'center' }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        animate="show"
      >
        {/* Logo / brand */}
        <motion.div variants={stagger} style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(28,14,6,0.06)', padding: '8px 18px',
            borderRadius: 100, border: '1px solid rgba(200,136,26,0.2)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#c8881a' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1c0e06', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Dragon · AI Career Clarity
            </span>
          </div>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          variants={stagger}
          className="font-display"
          style={{
            fontSize: 'clamp(32px, 4.5vw, 52px)',
            fontWeight: 400,
            lineHeight: 1.15,
            color: '#1c0e06',
            marginBottom: 20,
            letterSpacing: '-0.5px',
          }}
        >
          AI won't take your job.<br />
          <em style={{ color: '#c8881a' }}>But it will reshape your Tuesday.</em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={stagger}
          style={{
            fontSize: 17, lineHeight: 1.65, color: '#6b5f4e', fontWeight: 400,
            marginBottom: 36, maxWidth: 480, margin: '0 auto 36px',
          }}
        >
          Map your real work week. See exactly what changes — and your 3 smartest moves.
        </motion.p>

        {/* If we have a fetched sample, show preview */}
        {fetchedSample ? (
          <ParsedJobPreview
            sample={fetchedSample}
            onConfirm={handleConfirmImport}
            onBack={handleBackFromPreview}
            isMobile={isMobile}
          />
        ) : (
          <motion.div variants={stagger}>
            {/* Mode tabs */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 24, maxWidth: 440, margin: '0 auto 24px' }}>
              <button onClick={() => { setMode('role'); setUrlError('') }} style={tabStyle(mode === 'role')}>
                Enter Role
              </button>
              <button onClick={() => { setMode('url'); setError(false) }} style={tabStyle(mode === 'url')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                  </svg>
                  Import from Job Portal
                </span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {mode === 'role' ? (
                /* ── Enter Role mode (existing) ── */
                <motion.form
                  key="role-form"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSubmit}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
                    <div style={{ position: 'relative' }}>
                      <input
                        type="text"
                        value={role}
                        onChange={e => { setRole(e.target.value); setError(false) }}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        placeholder="e.g. Junior Financial Analyst"
                        style={{
                          width: '100%',
                          padding: '16px 20px',
                          fontSize: 16,
                          fontFamily: 'Outfit, sans-serif',
                          fontWeight: 400,
                          border: `1.5px solid ${error ? '#c8341a' : focused ? '#1c0e06' : '#ddd0bc'}`,
                          borderRadius: 12,
                          background: '#fff',
                          color: '#1c0e06',
                          outline: 'none',
                          boxShadow: focused ? '0 0 0 4px rgba(200,136,26,0.1)' : 'none',
                          transition: 'all 0.2s ease',
                        }}
                      />
                      {error && (
                        <p style={{ position: 'absolute', bottom: -20, left: 4, fontSize: 12, color: '#c8341a', fontWeight: 500 }}>
                          Please enter your job role to continue.
                        </p>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 12, flexDirection: isMobile ? 'column' : 'row' }}>
                      <select
                        value={industry}
                        onChange={e => setIndustry(e.target.value)}
                        style={{
                          flex: 1,
                          padding: '14px 20px',
                          fontSize: 15,
                          fontFamily: 'Outfit, sans-serif',
                          border: '1.5px solid #ddd0bc',
                          borderRadius: 12,
                          background: '#fff',
                          color: '#1c0e06',
                          outline: 'none',
                          cursor: 'pointer',
                          appearance: 'none',
                          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231c0e06' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 16px center',
                        }}
                      >
                        {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                      </select>

                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        padding: '14px 20px',
                        border: '1.5px solid #ddd0bc',
                        borderRadius: 12,
                        background: '#f5ecd8',
                        color: '#6b5f4e',
                        fontSize: 15,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                      }}>
                        <span style={{ fontSize: 18 }}>🇸🇬</span>
                        Singapore
                      </div>
                    </div>
                  </div>

                  <div style={{ position: 'relative', marginTop: error ? 24 : 0 }}>
                    <motion.div
                      style={{ position: 'absolute', inset: -1, borderRadius: 13, pointerEvents: 'none' }}
                      animate={{ boxShadow: ['0 0 0 0 rgba(200,136,26,0)', '0 0 22px 5px rgba(200,136,26,0.28)', '0 0 0 0 rgba(200,136,26,0)'] }}
                      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, backgroundColor: '#2e1a0c' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        fontSize: 16,
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 600,
                        background: '#1c0e06',
                        color: '#fdf9f2',
                        border: 'none',
                        borderRadius: 12,
                        cursor: 'pointer',
                        letterSpacing: '0.01em',
                        transition: 'background 0.2s ease',
                        position: 'relative',
                      }}
                    >
                      Map my week →
                    </motion.button>
                  </div>
                </motion.form>
              ) : (
                /* ── Import from Job Portal mode ── */
                <motion.form
                  key="url-form"
                  initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleUrlSubmit}
                >
                  {/* Platform badges */}
                  <div style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 20 }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: '#fff', border: '1.5px solid #ede0cc',
                      borderRadius: 12, padding: '10px 18px',
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="#2164f3"/>
                        <path d="M7 17h3V10H7v7zm1.5-8c1 0 1.5-.7 1.5-1.5S9.5 6 8.5 6 7 6.7 7 7.5 7.5 9 8.5 9zM14 17h3v-4c0-2-1-3-2.5-3-1.2 0-1.8.7-2 1.1V10h-3c0 .9 0 7 0 7h3v-3.9c0-1 .7-1.6 1.4-1.6.8 0 1.1.6 1.1 1.5V17z" fill="#fff"/>
                      </svg>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1c0e06' }}>LinkedIn</span>
                    </div>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      background: '#fff', border: '1.5px solid #ede0cc',
                      borderRadius: 12, padding: '10px 18px',
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <rect width="24" height="24" rx="4" fill="#2557a7"/>
                        <text x="4" y="17" fontSize="13" fontWeight="800" fill="#fff" fontFamily="sans-serif">in</text>
                      </svg>
                      <span style={{ fontSize: 14, fontWeight: 600, color: '#1c0e06' }}>Indeed</span>
                    </div>
                  </div>

                  <div style={{ position: 'relative', marginBottom: 16 }}>
                    <div style={{
                      position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)',
                      color: '#9a8b78', display: 'flex', alignItems: 'center',
                      pointerEvents: 'none',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      value={jobUrl}
                      onChange={e => { setJobUrl(e.target.value); setUrlError('') }}
                      onFocus={() => setUrlFocused(true)}
                      onBlur={() => setUrlFocused(false)}
                      placeholder="https://sg.indeed.com/viewjob?jk=..."
                      style={{
                        width: '100%',
                        padding: '16px 20px 16px 44px',
                        fontSize: 15,
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 400,
                        border: `1.5px solid ${urlError ? '#c8341a' : urlFocused ? '#1c0e06' : '#ddd0bc'}`,
                        borderRadius: 12,
                        background: '#fff',
                        color: '#1c0e06',
                        outline: 'none',
                        boxShadow: urlFocused ? '0 0 0 4px rgba(200,136,26,0.1)' : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    />
                    {urlError && (
                      <p style={{ position: 'absolute', bottom: -20, left: 4, fontSize: 12, color: '#c8341a', fontWeight: 500 }}>
                        {urlError}
                      </p>
                    )}
                  </div>

                  <div style={{ position: 'relative', marginTop: urlError ? 24 : 0 }}>
                    <motion.div
                      style={{ position: 'absolute', inset: -1, borderRadius: 13, pointerEvents: 'none' }}
                      animate={{ boxShadow: ['0 0 0 0 rgba(200,136,26,0)', '0 0 22px 5px rgba(200,136,26,0.28)', '0 0 0 0 rgba(200,136,26,0)'] }}
                      transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8, ease: 'easeInOut' }}
                    />
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02, backgroundColor: '#2e1a0c' }}
                      whileTap={{ scale: 0.98 }}
                      style={{
                        width: '100%',
                        padding: '18px 24px',
                        fontSize: 16,
                        fontFamily: 'Outfit, sans-serif',
                        fontWeight: 600,
                        background: '#1c0e06',
                        color: '#fdf9f2',
                        border: 'none',
                        borderRadius: 12,
                        cursor: 'pointer',
                        letterSpacing: '0.01em',
                        transition: 'background 0.2s ease',
                        position: 'relative',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7 10 12 15 17 10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                      </svg>
                      Import & analyse →
                    </motion.button>
                  </div>

                  {/* Demo URL shortcuts */}
                  <div style={{ marginTop: 20 }}>
                    <p style={{ fontSize: 12, color: '#bfb09c', marginBottom: 8 }}>Try these demo URLs</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
                      {[
                        { label: 'Marketing (Indeed)', url: 'https://sg.indeed.com/viewjob?jk=abc123&q=marketing+executive' },
                        { label: 'Analyst (LinkedIn)', url: 'https://www.linkedin.com/jobs/view/business-analyst-12345' },
                        { label: 'Engineer (Indeed)', url: 'https://sg.indeed.com/viewjob?jk=def456&q=software+engineer' },
                        { label: 'HR (LinkedIn)', url: 'https://www.linkedin.com/jobs/view/hr-executive-67890' },
                      ].map(demo => (
                        <button
                          key={demo.label}
                          type="button"
                          onClick={() => setJobUrl(demo.url)}
                          style={{
                            padding: '5px 12px', fontSize: 12,
                            fontFamily: 'Outfit, sans-serif',
                            background: 'transparent',
                            border: '1px solid #ddd0bc',
                            borderRadius: 100,
                            color: '#6b5f4e',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                          }}
                          onMouseEnter={e => { e.target.style.borderColor = '#c8881a'; e.target.style.color = '#1c0e06' }}
                          onMouseLeave={e => { e.target.style.borderColor = '#ddd0bc'; e.target.style.color = '#6b5f4e' }}
                        >
                          {demo.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Demo shortcuts for role mode */}
            {mode === 'role' && (
              <div style={{ marginTop: 40 }}>
                <p style={{ fontSize: 13, color: '#9a8b78', marginBottom: 12 }}>
                  Try these roles for the demo
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {['Junior Financial Analyst', 'Digital Marketer', 'UX Designer', 'Logistics Coordinator'].map(r => (
                    <button
                      key={r}
                      onClick={() => setRole(r)}
                      style={{
                        padding: '6px 14px',
                        fontSize: 13,
                        fontFamily: 'Outfit, sans-serif',
                        background: 'transparent',
                        border: '1px solid #ddd0bc',
                        borderRadius: 100,
                        color: '#6b5f4e',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={e => { e.target.style.borderColor = '#c8881a'; e.target.style.color = '#1c0e06' }}
                      onMouseLeave={e => { e.target.style.borderColor = '#ddd0bc'; e.target.style.color = '#6b5f4e' }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
