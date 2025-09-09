import { motion } from "framer-motion"

export default function ResultBanner({ outcome, amount }) {
  return (
<motion.div
  className={`result-banner ${outcome.toLowerCase()}`}
  initial={{ opacity: 0, scale: 0.8, y: -20 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.8, y: 20 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  <span>
    {outcome === "BIG_WIN" && `🎉 JACKPOT! Has ganado ${amount} creditos! 🎉`}
    {outcome === "SMALL_WIN" && `✨ Has ganado ${amount} creditos! ✨`}
    {outcome === "LOSE" && `😢 Perdiste. Vuelve a intentarlo!`}
  </span>
</motion.div>


  )
}
