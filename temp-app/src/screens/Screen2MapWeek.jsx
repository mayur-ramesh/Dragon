import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  DndContext, DragOverlay, useDraggable, useDroppable,
  PointerSensor, useSensor, useSensors, pointerWithin,
} from '@dnd-kit/core'
import { roles } from '../data/roleData'
import StepIndicator from '../components/StepIndicator'

const ZONES = [
  { id: 'daily',  label: 'I do this daily',  icon: '●', color: '#c8881a', bg: 'rgba(200,136,26,0.06)' },
  { id: 'weekly', label: 'I do this weekly', icon: '◑', color: '#1e8c5c', bg: 'rgba(30,140,92,0.06)'  },
  { id: 'rarely', label: 'I rarely do this', icon: '○', color: '#9a8b78', bg: 'rgba(140,120,100,0.06)' },
]

function TaskPill({ task, isDragging = false, isOverlay = false }) {
  return (
    <div style={{
      padding: '10px 16px',
      background: isDragging ? '#1c0e06' : '#fff',
      color: isDragging ? '#fdf9f2' : '#1e1510',
      border: `1.5px solid ${isDragging ? '#1c0e06' : '#e0d4c0'}`,
      borderRadius: 100,
      fontSize: 14,
      fontWeight: 500,
      fontFamily: 'Outfit, sans-serif',
      cursor: 'grab',
      userSelect: 'none',
      boxShadow: isDragging || isOverlay ? '0 8px 24px rgba(28,14,6,0.2)' : '0 1px 3px rgba(0,0,0,0.06)',
      transform: isDragging ? 'scale(1.06)' : 'scale(1)',
      transition: isOverlay ? 'none' : 'all 0.2s ease',
      whiteSpace: 'nowrap',
    }}>
      {task.name}
    </div>
  )
}

function DraggableTaskPill({ task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({ id: task.id })
  return (
    <div ref={setNodeRef} {...listeners} {...attributes} style={{ opacity: isDragging ? 0.3 : 1, touchAction: 'none' }}>
      <TaskPill task={task} isDragging={false} />
    </div>
  )
}

function DropZone({ zone, tasks, frequencies }) {
  const { setNodeRef, isOver } = useDroppable({ id: zone.id })
  const tasksInZone = tasks.filter(t => frequencies[t.id] === zone.id)

  return (
    <div
      ref={setNodeRef}
      style={{
        flex: 1,
        minHeight: 220,
        borderRadius: 16,
        border: `2px dashed ${isOver ? zone.color : '#ddd0bc'}`,
        background: isOver ? zone.bg : 'rgba(253,249,242,0.5)',
        padding: 20,
        transition: 'all 0.2s ease',
        transform: isOver ? 'scale(1.01)' : 'scale(1)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
        <span style={{ fontSize: 16, color: zone.color }}>{zone.icon}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#1c0e06', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {zone.label}
        </span>
        {tasksInZone.length > 0 && (
          <span style={{
            marginLeft: 'auto', background: zone.color, color: '#fff',
            borderRadius: 100, padding: '2px 8px', fontSize: 11, fontWeight: 700,
          }}>
            {tasksInZone.length}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minHeight: 60 }}>
        <AnimatePresence>
          {tasksInZone.map(task => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.85, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -8 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
            >
              <DraggableTaskPill task={task} />
            </motion.div>
          ))}
        </AnimatePresence>
        {tasksInZone.length === 0 && (
          <div style={{
            height: 48, border: '1.5px dashed #e0d4c0', borderRadius: 12,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#bfb09c', fontSize: 13,
          }}>
            Drop tasks here
          </div>
        )}
      </div>
    </div>
  )
}

export default function Screen2MapWeek({ roleKey, onNext, onBack }) {
  const roleData = roles[roleKey]
  const tasks = roleData.taskPool
  const [frequencies, setFrequencies] = useState({})
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }))
  const unsortedTasks = tasks.filter(t => !frequencies[t.id])
  const sortedCount = Object.keys(frequencies).length
  const minRequired = 8
  const canProceed = sortedCount >= minRequired
  const activeTask = tasks.find(t => t.id === activeId)

  function handleDragStart(e) { setActiveId(e.active.id) }
  function handleDragEnd(e) {
    const { active, over } = e
    setActiveId(null)
    if (!over) return
    const zoneId = ZONES.find(z => z.id === over.id)?.id
    if (zoneId) setFrequencies(prev => ({ ...prev, [active.id]: zoneId }))
  }

  function quickFill() {
    const entries = tasks.filter(t => !frequencies[t.id])
    entries.forEach((t, i) => {
      setTimeout(() => setFrequencies(prev => ({ ...prev, [t.id]: t.defaultFrequency })), i * 120)
    })
  }

  function demoMode() {
    setFrequencies({})
    setTimeout(() => {
      tasks.forEach((t, i) => {
        setTimeout(() => setFrequencies(prev => ({ ...prev, [t.id]: t.defaultFrequency })), i * 160)
      })
    }, 100)
  }

  function handleProceed() {
    const allFreqs = {}
    tasks.forEach(t => { allFreqs[t.id] = frequencies[t.id] || t.defaultFrequency })
    onNext(allFreqs)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#fdf9f2', padding: '24px 32px 40px' }}>
      {/* Top bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: 1200, margin: '0 auto 32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: '1.5px solid #e0d4c0', borderRadius: 10,
            padding: '8px 14px', cursor: 'pointer', fontSize: 14, color: '#6b5f4e',
            fontFamily: 'Outfit, sans-serif', fontWeight: 500,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            ← Back
          </button>
          <StepIndicator current={2} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: '#1c0e06', color: '#fdf9f2',
            padding: '8px 16px', borderRadius: 100, fontSize: 14, fontWeight: 600,
          }}>
            {roleData.title}
            <span style={{ background: 'rgba(255,255,255,0.15)', padding: '2px 8px', borderRadius: 100, fontSize: 12 }}>
              {roleData.industry}
            </span>
          </div>
          <button onClick={demoMode} style={{
            background: 'transparent', border: '1px solid #ddd0bc',
            borderRadius: 10, padding: '8px 14px', cursor: 'pointer',
            fontSize: 13, color: '#9a8b78', fontFamily: 'Outfit, sans-serif',
          }}>
            Demo mode
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="font-display" style={{
            fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 400, color: '#1c0e06',
            marginBottom: 12, lineHeight: 1.2,
          }}>
            Here are the common tasks for your role.
            <br />
            <span style={{ color: '#c8881a' }}>Drag them to match your actual week.</span>
          </h2>
          <p style={{ color: '#9a8b78', fontSize: 15 }}>This takes 60 seconds and makes your results personal.</p>
        </motion.div>

        {/* Progress */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 220, height: 6, background: '#ede0cc', borderRadius: 3, overflow: 'hidden' }}>
              <motion.div
                style={{ height: '100%', background: '#1e8c5c', borderRadius: 3 }}
                animate={{ width: `${(sortedCount / tasks.length) * 100}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              />
            </div>
            <span style={{ fontSize: 13, color: '#9a8b78', fontWeight: 500 }}>
              {sortedCount} of {tasks.length} tasks sorted
              {sortedCount >= minRequired ? ' ✓' : ` — sort ${minRequired - sortedCount} more to continue`}
            </span>
          </div>
        </div>

        <DndContext sensors={sensors} collisionDetection={pointerWithin} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {unsortedTasks.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{
              background: '#fff', border: '1.5px solid #ede0cc',
              borderRadius: 16, padding: '20px 24px', marginBottom: 24,
            }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: '#9a8b78', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 14 }}>
                Unsorted — drag into a column
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {unsortedTasks.map(task => <DraggableTaskPill key={task.id} task={task} />)}
              </div>
            </motion.div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 20, marginBottom: 28 }}>
            {ZONES.map(zone => (
              <DropZone key={zone.id} zone={zone} tasks={tasks} frequencies={frequencies} />
            ))}
          </div>

          <DragOverlay>
            {activeTask ? <TaskPill task={activeTask} isDragging isOverlay /> : null}
          </DragOverlay>
        </DndContext>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
          {unsortedTasks.length > 0 ? (
            <button onClick={quickFill} style={{
              background: 'transparent', border: '1.5px solid #ddd0bc', borderRadius: 12,
              padding: '12px 20px', fontSize: 14, fontFamily: 'Outfit, sans-serif',
              fontWeight: 500, color: '#6b5f4e', cursor: 'pointer', transition: 'all 0.2s ease',
            }}
            onMouseEnter={e => { e.target.style.borderColor = '#c8881a'; e.target.style.color = '#1c0e06' }}
            onMouseLeave={e => { e.target.style.borderColor = '#ddd0bc'; e.target.style.color = '#6b5f4e' }}>
              Quick fill remaining ({unsortedTasks.length})
            </button>
          ) : <div />}

          <motion.button
            onClick={handleProceed}
            disabled={!canProceed}
            whileHover={canProceed ? { scale: 1.02, backgroundColor: '#2e1a0c' } : {}}
            whileTap={canProceed ? { scale: 0.98 } : {}}
            style={{
              padding: '14px 32px', fontSize: 15, fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              background: canProceed ? '#1c0e06' : '#d8ccba',
              color: canProceed ? '#fdf9f2' : '#9a8b78',
              border: 'none', borderRadius: 12,
              cursor: canProceed ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease', letterSpacing: '0.01em',
            }}
          >
            Show me the future →
          </motion.button>
        </div>
      </div>
    </div>
  )
}
