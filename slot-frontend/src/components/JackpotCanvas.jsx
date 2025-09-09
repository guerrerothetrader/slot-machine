import { useEffect, useRef } from 'react'

export default function JackpotCanvas({ trigger, particleCount = 150 }) {
  const canvasRef = useRef(null)
  const particles = useRef([])
  const animationFrame = useRef(null)

  useEffect(() => {
    if (!trigger) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Inicializa partículas
    const createParticles = () => {
      particles.current = []
      for (let i = 0; i < particleCount; i++) {
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          vx: (Math.random() - 0.5) * 4,
          vy: 2 + Math.random() * 4,
          size: 4 + Math.random() * 6,
          color: ['#f7e260','#ff6b6b','#17e67d','#4ea3ff'][Math.floor(Math.random()*4)],
          rotation: Math.random() * 360,
          rotationSpeed: Math.random() * 10 - 5
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0,0,canvas.width,canvas.height)
      particles.current.forEach(p => {
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rotation * Math.PI / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size)
        ctx.restore()

        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed * 0.05

        if (p.y > canvas.height) {
          p.y = -10
          p.x = Math.random() * canvas.width
        }
      })
      animationFrame.current = requestAnimationFrame(draw)
    }

    createParticles()
    draw()

    return () => {
      cancelAnimationFrame(animationFrame.current)
      window.removeEventListener('resize', resize)
    }
  }, [trigger, particleCount])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        background: 'rgba(255,0,0,0.05)' // temporal para ver si el canvas aparece
      }}
    />
  )
}
