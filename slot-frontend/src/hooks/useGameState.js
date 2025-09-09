// src/hooks/useGameState.js
import { useState } from "react"

export function useGameState() {
  const [credits, setCredits] = useState(10)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [targets, setTargets] = useState([0,0,0])

  // catálogo fijo (debe coincidir con el backend)
  const catalog = ["🍒","🍋","🍊","⭐","💎"]

  const spin = async () => {
    try {
      const res = await fetch("http://localhost:4000/spin", {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      })
      const data = await res.json()

      // convertir símbolos en índices (para las animaciones de Reel)
      const newTargets = data.reels.map(s => catalog.indexOf(s))
      setTargets(newTargets)

      // guardar resultado
      setResult({ outcome: data.outcome, winAmount: data.winAmount })

      // actualizar créditos
      if (data.winAmount > 0) {
        setCredits(c => c + data.winAmount)
      } else {
        setCredits(c => c - 1)
      }
    } catch (err) {
      console.error("❌ Error fetching spin:", err)
    }
  }

  return { credits, spinning, setSpinning, result, catalog, targets, spin }
}
