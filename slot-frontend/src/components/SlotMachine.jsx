import { useCallback, useMemo, useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Reel from './Reel'
import SpinButton from './SpinButton'
import ResultBanner from './ResultBanner'
import CreditsDisplay from './CreditsDisplay'
import JackpotCanvas from './JackpotCanvas'
import { useGameState } from '../hooks/useGameState'
import { useSpinController } from '../hooks/useSpinController'

const LOOP_COUNT = 6

export default function SlotMachine() {
  const { credits, spinning, setSpinning, result, catalog, targets, spin } = useGameState()
  
  // Estado interno para mostrar partículas
  const [showJackpot, setShowJackpot] = useState(false)

  // Detecta jackpot
useEffect(() => {
  if (result?.outcome === 'BIG_WIN') { // <-- si BIG_WIN es tu jackpot
    setShowJackpot(true)
    const timer = setTimeout(() => setShowJackpot(false), 3000)
    return () => clearTimeout(timer)
  }
}, [result])


  const handleSpin = useCallback(() => {
    if (!catalog || catalog.length === 0) return

    setSpinning(true)
    spin(1)

    const ANIMATION_DURATION = 0.2 * LOOP_COUNT * 1000 + 150
    setTimeout(() => {
      setSpinning(false)
    }, ANIMATION_DURATION)

  }, [spin, catalog])

  useSpinController({
    spinning,
    setSpinning,
    onSpinStart: () => {},
    onSpinEnd: () => {}
  })

  const reelProps = useMemo(() => [
    { delay: 0 },
    { delay: 0.25 },
    { delay: 0.5 },
  ], [])

  return (
    <div className="slot" style={{ position: 'relative' }}>
      <div className="reels">
        {catalog.length > 0 && [0,1,2].map((r)=> (
          <div className="reel-window" key={r}>
            <Reel
              symbols={catalog}
              targetIndex={targets[r] ?? 0}
              spinning={spinning}
              delay={reelProps[r].delay}
            />
          </div>
        ))}
      </div>

      <div className="controls">
        <SpinButton disabled={spinning || credits <= 0} onClick={handleSpin} />
        <CreditsDisplay credits={credits} />
      </div>

      <div className="banner-wrap">
        <AnimatePresence mode="wait">
          {result && !spinning && (
            <ResultBanner key={result.outcome} outcome={result.outcome} amount={result.winAmount} />
          )}
        </AnimatePresence>
      </div>

      {/* Canvas de partículas solo si showJackpot */}
      {showJackpot && <JackpotCanvas trigger={showJackpot} particleCount={200} />}
    </div>
  )
}
