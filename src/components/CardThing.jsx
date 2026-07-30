import { useState, useRef, useCallback, useEffect } from 'react'

const EXPLOSION_PAD = 120

function ExplosionOverlay({ rect, onDone }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !rect) return
    const ctx = canvas.getContext('2d')
    const cw = rect.width + EXPLOSION_PAD * 2
    const ch = rect.height + EXPLOSION_PAD * 2
    canvas.width = cw
    canvas.height = ch
    const cx = cw / 2
    const cy = ch / 2

    const PARTICLE_COUNT = 60
    const particles = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 3 + Math.random() * 8
      return {
        x: cx + (Math.random() - 0.5) * rect.width * 0.5,
        y: cy + (Math.random() - 0.5) * rect.height * 0.3,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 4 + Math.random() * 8,
        alpha: 1,
        color: ['#3B82F6', '#6366F1', '#F59E0B', '#EF4444', '#10B981', '#EC4899'][
          Math.floor(Math.random() * 6)
        ],
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 20,
        shape: Math.random() > 0.5 ? 'rect' : 'triangle',
      }
    })

    let frame
    const animate = () => {
      ctx.clearRect(0, 0, cw, ch)
      let alive = false
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.12
        p.vx *= 0.995
        p.alpha -= 0.008
        p.rotation += p.rotSpeed
        if (p.alpha <= 0) continue
        alive = true
        ctx.save()
        ctx.globalAlpha = p.alpha
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        if (p.shape === 'rect') {
          ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size)
        } else {
          ctx.beginPath()
          ctx.moveTo(0, -p.size / 2)
          ctx.lineTo(p.size / 2, p.size / 2)
          ctx.lineTo(-p.size / 2, p.size / 2)
          ctx.closePath()
          ctx.fill()
        }
        ctx.restore()
      }
      if (alive) {
        frame = requestAnimationFrame(animate)
      } else {
        onDone()
      }
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [rect, onDone])

  if (!rect) return null
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: -EXPLOSION_PAD,
        left: -EXPLOSION_PAD,
        width: rect.width + EXPLOSION_PAD * 2,
        height: rect.height + EXPLOSION_PAD * 2,
        pointerEvents: 'none',
        zIndex: 10,
      }}
    />
  )
}

export function CardThing({ stat, subtext, footerNote, explodeOnHover }) {
  const [exploding, setExploding] = useState(false)
  const [hidden, setHidden] = useState(false)
  const cardRef = useRef(null)
  const [rect, setRect] = useState(null)

  const handleMouseEnter = useCallback(() => {
    if (!explodeOnHover || exploding) return
    const el = cardRef.current
    if (el) setRect({ width: el.offsetWidth, height: el.offsetHeight })
    setExploding(true)
    setHidden(true)
  }, [explodeOnHover, exploding])

  const handleMouseLeave = useCallback(() => {
    setExploding(false)
    setHidden(false)
  }, [])

  const handleExplosionDone = useCallback(() => {}, [])

  return (
    <div
      ref={cardRef}
      className="rounded-lg border border-[#E5E7EB] bg-white p-5 shadow-sm"
      style={{ position: 'relative', overflow: 'visible', cursor: explodeOnHover ? 'pointer' : undefined }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div style={{
        transition: 'opacity 0.1s ease-out, transform 0.25s ease-out',
        opacity: hidden ? 0 : 1,
        transform: hidden ? 'scale(1.15)' : 'scale(1)',
      }}>
        <p className="m-0 text-[13px] font-medium text-[#6B7280]">{stat}</p>
        <div className="mt-2 text-2xl font-semibold text-[#374151]">{subtext}</div>
        {footerNote && <div className="mt-3 text-xs text-[#9CA3AF]">{footerNote}</div>}
      </div>
      {exploding && <ExplosionOverlay rect={rect} onDone={handleExplosionDone} />}
    </div>
  )
}
