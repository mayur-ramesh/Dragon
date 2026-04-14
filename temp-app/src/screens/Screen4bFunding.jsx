import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { roles } from '../data/roleData'
import StepIndicator from '../components/StepIndicator'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', fn)
    return () => window.removeEventListener('resize', fn)
  }, [])
  return isMobile
}

/* ── Pricing Tier Card ── */
function TierCard({ tier, index, isMobile }) {
  const isPremium = tier.id === 'premium'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 + index * 0.12, duration: 0.45 }}
      style={{
        flex: 1,
        minWidth: 0,
        background: '#fff',
        border: isPremium ? '2px solid #c8881a' : '1.5px solid #ede0cc',
        borderRadius: 18,
        padding: isMobile ? '24px 20px' : '28px 24px',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {isPremium && (
        <motion.div
          style={{
            position: 'absolute', inset: -1, borderRadius: 18, pointerEvents: 'none',
          }}
          animate={{
            boxShadow: [
              '0 0 0 0 rgba(200,136,26,0)',
              '0 0 24px 4px rgba(200,136,26,0.15)',
              '0 0 0 0 rgba(200,136,26,0)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
        />
      )}

      {/* Tier label */}
      <p style={{
        fontSize: 13, fontWeight: 600,
        color: isPremium ? '#c8881a' : '#9a8b78',
        marginBottom: 8, textTransform: 'capitalize',
      }}>
        {tier.label}
      </p>

      {/* Price */}
      <div style={{ marginBottom: 16 }}>
        <span className="font-display" style={{
          fontSize: isPremium ? 36 : 32,
          fontWeight: 400,
          color: '#1c0e06',
        }}>
          {tier.price}
        </span>
        {tier.period && (
          <span style={{ fontSize: 14, color: '#9a8b78', marginLeft: 4 }}>{tier.period}</span>
        )}
      </div>

      {/* Description */}
      <p style={{ fontSize: 13, color: '#6b5f4e', lineHeight: 1.6, flex: 1 }}>
        {tier.description}
      </p>
    </motion.div>
  )
}

/* ── Funding Scheme Card ── */
function FundingCard({ scheme, index, isMobile }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.12, duration: 0.45 }}
      style={{
        background: '#fff',
        border: '1.5px solid #ede0cc',
        borderRadius: 18,
        padding: isMobile ? '24px 18px' : '28px 32px',
        marginBottom: 16,
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        marginBottom: 16, flexWrap: 'wrap', gap: 8,
      }}>
        <h3 style={{
          fontSize: isMobile ? 16 : 19, fontWeight: 700,
          color: '#1c0e06', margin: 0,
        }}>
          {scheme.title}
        </h3>
        <span style={{
          fontSize: 14, fontWeight: 600, color: '#1e8c5c',
          whiteSpace: 'nowrap',
        }}>
          {scheme.amount}
        </span>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: '#4a3e30', lineHeight: 1.7, marginBottom: 16 }}>
        {scheme.description}
      </p>

      {/* How Dragon uses this */}
      <div style={{
        borderLeft: '3px solid #ede0cc',
        paddingLeft: 20,
        marginLeft: 4,
      }}>
        <p style={{ fontSize: 13, color: '#6b5f4e', lineHeight: 1.65, fontStyle: 'italic' }}>
          <span style={{ color: '#1c0e06', fontWeight: 600, fontStyle: 'normal' }}>How Dragon uses this: </span>
          {scheme.dragonNote}
        </p>
      </div>
    </motion.div>
  )
}

const PRICING_TIERS = [
  {
    id: 'free',
    label: 'Free tier',
    price: '$0',
    period: '',
    description: 'Role input + task mapping + basic AI impact view (Year 1 only). No slider, no moves, no summary.',
  },
  {
    id: 'premium',
    label: 'Premium',
    price: '$10/mo',
    period: 'or $96/yr',
    description: 'Full 5-year timeline slider, AI-proof moves, clarity summary, share results, course matching with SkillsFuture links.',
  },
  {
    id: 'enterprise',
    label: 'Enterprise',
    price: '$500-2K/yr',
    period: '',
    description: 'Bulk workforce assessments for HR/L&D. Team dashboards, role comparison, custom reports.',
  },
]

const FUNDING_SCHEMES = [
  {
    title: 'SkillsFuture Credit (base tier)',
    amount: '$500 per citizen',
    description: 'Every Singapore Citizen aged 25+ receives $500 in SkillsFuture Credit. It never expires and can be used on SSG-approved courses and career development tools.',
    dragonNote: 'If Dragon becomes an SSG-approved platform, users can claim their premium subscription ($96/yr) directly from their SkillsFuture Credit — making it effectively free. One year of Dragon costs less than 20% of a user\'s base credit.',
  },
  {
    title: 'SkillsFuture Credit (mid-career tier)',
    amount: '$4,000 for ages 40+',
    description: 'Singapore Citizens aged 40+ received a substantial $4,000 top-up from May 2024 for courses with strong employability outcomes. No expiry date.',
    dragonNote: 'Mid-career users (our secondary segment, 35-50) have even more credit available. Dragon premium + any recommended courses can be fully covered by this credit alone.',
  },
  {
    title: 'SkillsFuture Enterprise Credit (SFEC)',
    amount: '$10,000 per company',
    description: 'Eligible employers receive $10,000 to offset up to 90% of costs for workforce transformation programmes. Being redesigned in 2H 2026 for expanded support.',
    dragonNote: 'B2B clients (HR/L&D teams) can claim Dragon Enterprise licenses under SFEC. A $2,000/yr license is fully covered, making the ROI argument effortless for HR buyers.',
  },
  {
    title: 'SSG course fee subsidies',
    amount: 'Up to 70-90% off courses',
    description: 'SSG provides 70% subsidy for citizens and 90% for mid-career enhanced subsidy (ages 40+) on approved courses.',
    dragonNote: 'The courses Dragon recommends (NUS, SMU, General Assembly) already carry SSG subsidies. Dragon shows users the subsidised price, not the sticker price — making courses feel affordable and increasing referral conversion.',
  },
]

export default function Screen4bFunding({ roleKey, onNext, onBack }) {
  const roleData = roles[roleKey]
  const isMobile = useIsMobile()

  return (
    <div style={{
      minHeight: '100vh',
      background: '#fdf9f2',
      padding: isMobile ? '16px 14px 60px' : '24px 32px 60px',
    }}>
      {/* Top nav */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        maxWidth: 1100, margin: isMobile ? '0 auto 16px' : '0 auto 28px',
        flexWrap: 'wrap', gap: 8,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: '1.5px solid #e0d4c0', borderRadius: 10,
            padding: '8px 14px', cursor: 'pointer', fontSize: 14, color: '#6b5f4e',
            fontFamily: 'Outfit, sans-serif', fontWeight: 500,
          }}>
            ← Back
          </button>
          <StepIndicator current={5} total={6} />
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: 'center', marginBottom: 48 }}
        >
          <h2 className="font-display" style={{
            fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, color: '#1c0e06',
            marginBottom: 12, lineHeight: 1.15,
          }}>
            Upskilling shouldn't cost you out of pocket.
          </h2>
          <p style={{ fontSize: 16, color: '#6b5f4e', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
            Every course Dragon recommends is eligible for government subsidies. Most Singapore professionals
            already have enough SkillsFuture Credit to cover Dragon Premium and their first course — at zero cost.
          </p>
        </motion.div>

        {/* ─── Pricing Tiers ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
          }}>
            <h3 style={{
              fontSize: 13, fontWeight: 700, color: '#9a8b78',
              textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0,
              whiteSpace: 'nowrap',
            }}>
              Dragon pricing tiers
            </h3>
            <div style={{
              flex: 1, height: 1, background: '#ede0cc',
            }} />
          </div>

          <div style={{
            display: 'flex', gap: isMobile ? 12 : 16,
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'stretch',
          }}>
            {PRICING_TIERS.map((tier, i) => (
              <TierCard key={tier.id} tier={tier} index={i} isMobile={isMobile} />
            ))}
          </div>
        </motion.div>

        {/* ─── Funding Schemes ─── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ marginBottom: 48 }}
        >
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24,
          }}>
            <h3 style={{
              fontSize: 13, fontWeight: 700, color: '#9a8b78',
              textTransform: 'uppercase', letterSpacing: '0.08em', margin: 0,
              whiteSpace: 'nowrap',
            }}>
              Singapore funding schemes that cover the cost
            </h3>
            <div style={{
              flex: 1, height: 1, background: '#ede0cc',
            }} />
          </div>

          {FUNDING_SCHEMES.map((scheme, i) => (
            <FundingCard key={i} scheme={scheme} index={i} isMobile={isMobile} />
          ))}
        </motion.div>

        {/* ─── Confidence paragraph ─── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            background: '#f8f2e8',
            border: '1px solid #ede0cc',
            borderRadius: 18,
            padding: isMobile ? '24px 20px' : '28px 32px',
            marginBottom: 40,
          }}
        >
          <p style={{
            fontSize: 15, color: '#4a3e30', lineHeight: 1.75,
            fontStyle: 'italic',
          }}>
            For most users, Dragon Premium costs $0 out of pocket. Every Singapore Citizen has at
            least $500 in SkillsFuture Credit sitting unused — Dragon Premium costs just $96/year.
            For companies, the $10,000 SFEC credit covers 5 years of Dragon Enterprise. The
            platform doesn't just recommend courses — it shows users exactly how much government
            funding they can use to pay for them.
          </p>
        </motion.div>

        {/* CTA */}
        <div style={{ textAlign: 'right' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <motion.div
              style={{ position: 'absolute', inset: -1, borderRadius: 13, pointerEvents: 'none' }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(200,136,26,0)',
                  '0 0 22px 5px rgba(200,136,26,0.28)',
                  '0 0 0 0 rgba(200,136,26,0)',
                ],
              }}
              transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 0.8 }}
            />
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.02, backgroundColor: '#2e1a0c' }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 32px', fontSize: 15,
                fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                background: '#1c0e06', color: '#fdf9f2',
                border: 'none', borderRadius: 12,
                cursor: 'pointer', letterSpacing: '0.01em',
                position: 'relative',
              }}
            >
              See my clarity summary →
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}
