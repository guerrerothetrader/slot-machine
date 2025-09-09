import express from "express"
import cors from "cors"

const app = express()
const PORT = 4000

app.use(cors())
app.use(express.json())

const symbols = ["🍒","🍋","🍊","⭐","💎"]

// Función que genera un giro
function generateSpin() {
  const reels = [
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)],
    symbols[Math.floor(Math.random() * symbols.length)]
  ]

  let outcome = "LOSE"
  let winAmount = 0

  if (reels[0] === reels[1] && reels[1] === reels[2]) {
    outcome = "BIG_WIN"
    winAmount = 10
  } else if (reels[0] === reels[1] || reels[1] === reels[2] || reels[0] === reels[2]) {
    outcome = "SMALL_WIN"
    winAmount = 1
  }

  return { reels, outcome, winAmount }
}

// Endpoint principal
app.post("/spin", (req, res) => {
  const result = generateSpin()
  res.json(result)
})

app.listen(PORT, () => {
  console.log(`🎰 Slot backend running on http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
  res.send("🎰 Slot API running!");
});