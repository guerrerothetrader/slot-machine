import { useEffect } from 'react'


// Coordina tiempos de parada y desbloqueo del botón
export function useSpinController({ spinning, setSpinning, onSpinStart, onSpinEnd, stopAfterMs = 2200, stagger = 320 }){
useEffect(()=>{
if(!spinning) return
onSpinStart?.()
// simulate timeline end -> desbloquear después de que TODOS hayan parado
const total = stopAfterMs + stagger*2 + 200
const t = setTimeout(()=>{
setSpinning(false)
onSpinEnd?.()
}, total)
return ()=>clearTimeout(t)
},[spinning])
}