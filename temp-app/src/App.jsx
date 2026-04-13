import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Screen1Onboarding from './screens/Screen1Onboarding'
import Screen2MapWeek from './screens/Screen2MapWeek'
import Screen3Dashboard from './screens/Screen3Dashboard'
import Screen4Moves from './screens/Screen4Moves'
import Screen5Summary from './screens/Screen5Summary'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
}
const pageTransition = { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }

export default function App() {
  const [screen, setScreen] = useState(1)
  const [roleKey, setRoleKey] = useState(null)
  const [taskFrequencies, setTaskFrequencies] = useState({})
  const [customTasks, setCustomTasks] = useState([])
  const [sliderYear, setSliderYear] = useState(1)

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f7' }}>
      <AnimatePresence mode="wait">
        {screen === 1 && (
          <motion.div key="s1" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Screen1Onboarding onNext={(key) => { setRoleKey(key); setScreen(2) }} />
          </motion.div>
        )}
        {screen === 2 && (
          <motion.div key="s2" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Screen2MapWeek
              roleKey={roleKey}
              onNext={({ frequencies, customTasks: ct }) => { setTaskFrequencies(frequencies); setCustomTasks(ct); setScreen(3) }}
              onBack={() => setScreen(1)}
            />
          </motion.div>
        )}
        {screen === 3 && (
          <motion.div key="s3" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Screen3Dashboard
              roleKey={roleKey}
              taskFrequencies={taskFrequencies}
              customTasks={customTasks}
              sliderYear={sliderYear}
              setSliderYear={setSliderYear}
              onNext={() => setScreen(4)}
              onBack={() => setScreen(2)}
            />
          </motion.div>
        )}
        {screen === 4 && (
          <motion.div key="s4" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Screen4Moves
              roleKey={roleKey}
              taskFrequencies={taskFrequencies}
              onNext={() => setScreen(5)}
              onBack={() => setScreen(3)}
            />
          </motion.div>
        )}
        {screen === 5 && (
          <motion.div key="s5" variants={pageVariants} initial="initial" animate="animate" exit="exit" transition={pageTransition}>
            <Screen5Summary
              roleKey={roleKey}
              taskFrequencies={taskFrequencies}
              onRestart={() => { setScreen(1); setRoleKey(null); setTaskFrequencies({}); setCustomTasks([]); setSliderYear(1) }}
              onBack={() => setScreen(4)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
