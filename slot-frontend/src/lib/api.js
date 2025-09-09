import axios from 'axios'


const USE_MOCK = true // cambia a false cuando tengas backend


export async function spinApi({ bet = 1 }){
if(USE_MOCK){
// Simulación simple: 20% win, 3% jackpot
await sleep(420)
const symbols = ['🍒','🍋','🍇','⭐','🔔','🍀']
const rand = Math.random()
let outcome = 'lose'
let reels = Array.from({length:3}, ()=>symbols[Math.floor(Math.random()*symbols.length)])
let winAmount = 0
if(rand < 0.03){
outcome = 'jackpot'; reels = ['⭐','⭐','⭐']; winAmount = 50
} else if(rand < 0.23){
outcome = 'win'; reels = Array(3).fill(['🍒','🍋','🍇','🔔','🍀'][Math.floor(Math.random()*5)]); winAmount = 5
}
// créditos ficticios (resta apuesta, suma premio)
spinApi._credits = (spinApi._credits ?? 100) - bet + winAmount
return { reels, winAmount, credits: spinApi._credits, outcome }
}


const { data } = await axios.post('/api/spin', { bet })
return data
}


function sleep(ms){ return new Promise(r=>setTimeout(r,ms)) }