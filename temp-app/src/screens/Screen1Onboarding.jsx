import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { matchRole } from '../data/roleData'

const INDUSTRIES = ['Fintech', 'Healthcare', 'Logistics', 'Marketing', 'Education', 'Tech', 'Creative & Media']

// Animated background lines
function BackgroundLines() {
  const lines = Array.from({ length: 12 }, (_, i) => i)
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
      {lines.map((i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            background: `linear-gradient(90deg, transparent, rgba(26,26,46,0.04), transparent)`,
            height: 1,
            width: '60%',
            left: `${(i * 13) % 60}%`,
            top: `${8 + i * 8}%`,
          }}
          animate={{
            x: ['-10%', '15%', '-10%'],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 8 + i * 1.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.6,
          }}
        />
      ))}
      {/* Subtle circles */}
      {[0,1,2].map((i) => (
        <motion.div
          key={`circle-${i}`}
          style={{
            position: 'absolute',
            borderRadius: '50%',
            border: '1px solid rgba(26,26,46,0.05)',
            width: 300 + i * 200,
            height: 300 + i * 200,
            left: `${20 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 7 + i * 2, repeat: Infinity, ease: 'easeInOut', delay: i * 1.5 }}
        />
      ))}
    </div>
  )
}

export default function Screen1Onboarding({ onNext }) {
  const [role, setRole] = useState('')
  const [industry, setIndustry] = useState('Fintech')
  const [focused, setFocused] = useState(false)
  const [error, setError] = useState(false)

  const stagger = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  function handleSubmit(e) {
    e.preventDefault()
    if (!role.trim()) { setError(true); return }
    onNext(matchRole(role.trim()))
  }

  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#faf9f7',
      padding: '40px 24px',
    }}>
      <BackgroundLines />

      <motion.div
        style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 600, textAlign: 'center' }}
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        initial="hidden"
        animate="show"
      >
        {/* Logo / brand */}
        <motion.div variants={stagger} style={{ marginBottom: 48 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            background: 'rgba(26,26,46,0.06)', padding: '8px 18px',
            borderRadius: 100, border: '1px solid rgba(26,26,46,0.1)',
          }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#6aaa7a' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              AI Career Clarity
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
            color: '#1a1a2e',
            marginBottom: 20,
            letterSpacing: '-0.5px',
          }}
        >
          AI won't take your job.<br />
          <em style={{ color: '#d4a843' }}>But it will reshape your Tuesday.</em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={stagger}
          style={{
            fontSize: 17, lineHeight: 1.65, color: '#6b6882', fontWeight: 400,
            marginBottom: 48, maxWidth: 480, margin: '0 auto 48px',
          }}
        >
          Map your real work week. See exactly what changes — and your 3 smartest moves.
        </motion.p>

        {/* Form */}
        <motion.form variants={stagger} onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 16 }}>
            {/* Role input */}
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
                  border: `1.5px solid ${error ? '#e07060' : focused ? '#1a1a2e' : '#ddd9d1'}`,
                  borderRadius: 12,
                  background: '#fff',
                  color: '#1a1a2e',
                  outline: 'none',
                  boxShadow: focused ? '0 0 0 4px rgba(26,26,46,0.06)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              />
              {error && (
                <p style={{ position: 'absolute', bottom: -20, left: 4, fontSize: 12, color: '#e07060', fontWeight: 500 }}>
                  Please enter your job role to continue.
                </p>
              )}
            </div>

            {/* Industry + Location row */}
            <div style={{ display: 'flex', gap: 12 }}>
              <select
                value={industry}
                onChange={e => setIndustry(e.target.value)}
                style={{
                  flex: 1,
                  padding: '14px 20px',
                  fontSize: 15,
                  fontFamily: 'Outfit, sans-serif',
                  border: '1.5px solid #ddd9d1',
                  borderRadius: 12,
                  background: '#fff',
                  color: '#1a1a2e',
                  outline: 'none',
                  cursor: 'pointer',
                  appearance: 'none',
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%231a1a2e' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 16px center',
                }}
              >
                {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
              </select>

              {/* Singapore badge */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 20px',
                border: '1.5px solid #ddd9d1',
                borderRadius: 12,
                background: '#f5f3f0',
                color: '#6b6882',
                fontSize: 15,
                fontWeight: 500,
                whiteSpace: 'nowrap',
              }}>
                <span style={{ fontSize: 18 }}>🇸🇬</span>
                Singapore
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02, backgroundColor: '#252545' }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '18px 24px',
              fontSize: 16,
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 600,
              background: '#1a1a2e',
              color: '#faf9f7',
              border: 'none',
              borderRadius: 12,
              cursor: 'pointer',
              letterSpacing: '0.01em',
              transition: 'background 0.2s ease',
              marginTop: error ? 24 : 0,
            }}
          >
            Map my week →
          </motion.button>
        </motion.form>

        {/* Roles hint */}
        <motion.div variants={stagger} style={{ marginTop: 40 }}>
          <p style={{ fontSize: 13, color: '#9896a4', marginBottom: 12 }}>
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
                  border: '1px solid #ddd9d1',
                  borderRadius: 100,
                  color: '#6b6882',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { e.target.style.borderColor = '#1a1a2e'; e.target.style.color = '#1a1a2e' }}
                onMouseLeave={e => { e.target.style.borderColor = '#ddd9d1'; e.target.style.color = '#6b6882' }}
              >
                {r}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
