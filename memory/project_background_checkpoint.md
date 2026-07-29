---
name: Background checkpoint - grid + naranja
description: Combinación de fondo que le gustó al usuario: manchas naranjas atmosféricas + grid blueprint encima
type: project
---

Al usuario le gustó esta combinación para el fondo de la landing:

```css
/* Atmospheric gradient + grid */
.grid-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background:
    radial-gradient(ellipse 70% 50% at 15% 15%, rgba(255, 106, 31, 0.1) 0%, transparent 70%),
    radial-gradient(ellipse 50% 40% at 80% 75%, rgba(255, 106, 31, 0.06) 0%, transparent 65%),
    linear-gradient(var(--grid-color) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color) 1px, transparent 1px),
    linear-gradient(var(--grid-color-strong) 1px, transparent 1px),
    linear-gradient(90deg, var(--grid-color-strong) 1px, transparent 1px);
  background-size: 100% 100%, 100% 100%, 24px 24px, 24px 24px, 120px 120px, 120px 120px;
  background-position: 0 0, 0 0, -1px -1px, -1px -1px, -1px -1px, -1px -1px;
  mask-image: radial-gradient(ellipse at center, #000 30%, transparent 85%);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 30%, transparent 85%);
}
```

**Why:** Las manchas naranjas calientan las líneas de la grilla donde se superponen, haciéndola consistente con la paleta naranja de la marca.
**How to apply:** Si el usuario quiere volver a este estado, aplicar exactamente este CSS en globals.css para .grid-bg.
