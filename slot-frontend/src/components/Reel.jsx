import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

const SYMBOL_SIZE = 88
const LOOP_COUNT = 6

export default function Reel({ symbols = [], targetIndex = 0, spinning, delay = 0 }) {
  const controls = useAnimationControls()
  const trackRef = useRef(null)

  // Estado interno para evitar que la animación use un array vacío si props cambia
  const [currentSymbols, setCurrentSymbols] = useState(symbols)

  useEffect(() => {
    if (spinning) {
      setCurrentSymbols(symbols) // tomamos snapshot al iniciar el spin
    }
  }, [spinning, symbols])

  if (!currentSymbols || currentSymbols.length === 0) return null

  const targetOffset = -((targetIndex + 1) * SYMBOL_SIZE)

  useEffect(() => {
    let stopped = false

    const startAnimation = async () => {
      if (spinning) {
        // squash & stretch
        await controls.start({ scaleY: 0.92, transition: { duration: 0.02, ease: [0.2,0.8,0.2,1] } })
        await controls.start({ scaleY: 1, transition: { duration: 0.12 } })

        // loop vertical con vueltas fijas
        await controls.start({
          y: [0, -SYMBOL_SIZE * currentSymbols.length * LOOP_COUNT],
          transition: {
            delay,
            duration: 0.2 * LOOP_COUNT,
            ease: 'linear'
          }
        })
      } else {
        if (stopped) return
        stopped = true

        // rebote final
        await controls.start({
          y: targetOffset - SYMBOL_SIZE * currentSymbols.length * LOOP_COUNT,
          transition: { delay, duration: 0.15, ease: [0.12,0.62,0.15,0.99] }
        })
        await controls.start({ y: targetOffset + 6, transition: { duration: 0.08, ease: 'easeOut' } })
        await controls.start({ y: targetOffset, transition: { duration: 0.06, ease: 'easeOut' } })
      }
    }

    startAnimation()
    return () => { controls.stop() }
  }, [spinning, targetIndex, currentSymbols])

  const renderSymbols = [...currentSymbols, ...currentSymbols, ...currentSymbols, ...currentSymbols]

  return (
    <motion.div ref={trackRef} className="reel-track" animate={controls} initial={{ y: 0 }}>
      {renderSymbols.map((s, i) => (
        <div className="symbol" key={i}>{s}</div>
      ))}
    </motion.div>
  )
}
