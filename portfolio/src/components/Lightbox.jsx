import { useCallback, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, m, useReducedMotion } from 'framer-motion'
import { getImage } from '../lib/images'
import { DUR, EASE } from '../motion/tokens'
import styles from './Lightbox.module.css'

/**
 * A deliberately small lightbox — around a hundred lines instead of a dependency.
 * Animates opacity and transform only; keyboard-driven; locks background scroll
 * without shifting the page (the scrollbar width is compensated).
 */
export function Lightbox({ images, index, onClose, onNavigate }) {
  const reduced = useReducedMotion()
  const open = index !== null && index >= 0
  const image = open ? images[index] : null

  const handleKey = useCallback(
    (event) => {
      if (!open) return
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') onNavigate((index + 1) % images.length)
      if (event.key === 'ArrowLeft') onNavigate((index - 1 + images.length) % images.length)
    },
    [open, index, images.length, onClose, onNavigate],
  )

  useEffect(() => {
    if (!open) return
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [open, handleKey])

  // Lock scroll. Padding compensation keeps the page from jumping sideways when
  // the scrollbar disappears.
  useEffect(() => {
    if (!open) return
    const { body } = document
    const scrollbar = window.innerWidth - document.documentElement.clientWidth
    const prevOverflow = body.style.overflow
    const prevPadding = body.style.paddingRight

    body.style.overflow = 'hidden'
    if (scrollbar > 0) body.style.paddingRight = `${scrollbar}px`

    return () => {
      body.style.overflow = prevOverflow
      body.style.paddingRight = prevPadding
    }
  }, [open])

  const resolved = image?.key ? getImage(image.key) : null

  // The portal target only exists in a browser. Bailing out here keeps the
  // component safe to render in any non-DOM environment (tests, SSR checks)
  // without disturbing the exit animation, which needs the tree to stay mounted.
  if (typeof document === 'undefined') return null

  const fade = reduced
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1, transition: { duration: DUR.base, ease: EASE } },
        exit: { opacity: 0, transition: { duration: DUR.fast, ease: EASE } },
      }

  const rise = reduced
    ? { initial: {}, animate: {}, exit: {} }
    : {
        initial: { opacity: 0, scale: 0.985, y: 8 },
        animate: { opacity: 1, scale: 1, y: 0, transition: { duration: DUR.base, ease: EASE } },
        exit: { opacity: 0, scale: 0.99, transition: { duration: DUR.fast, ease: EASE } },
      }

  return createPortal(
    <AnimatePresence>
      {open && (
        <m.div
          className={styles.backdrop}
          role="dialog"
          aria-modal="true"
          aria-label={image?.alt || 'Expanded image'}
          onClick={onClose}
          {...fade}
        >
          <button className={styles.close} onClick={onClose} aria-label="Close">
            Close
          </button>

          {images.length > 1 && (
            <div className={styles.counter}>
              {index + 1} / {images.length}
            </div>
          )}

          <m.div
            className={styles.stage}
            onClick={(event) => event.stopPropagation()}
            {...rise}
          >
            {resolved ? (
              <picture>
                {resolved.avif && <source type="image/avif" srcSet={resolved.avif} sizes="92vw" />}
                {resolved.webp && <source type="image/webp" srcSet={resolved.webp} sizes="92vw" />}
                <img
                  className={styles.img}
                  src={resolved.src}
                  alt={image?.alt || ''}
                  draggable={false}
                />
              </picture>
            ) : (
              <div className={styles.empty}>{image?.key}</div>
            )}

            {image?.caption ? <p className={styles.caption}>{image.caption}</p> : null}
          </m.div>

          {images.length > 1 && (
            <>
              <button
                className={`${styles.arrow} ${styles.arrowPrev}`}
                aria-label="Previous image"
                onClick={(event) => {
                  event.stopPropagation()
                  onNavigate((index - 1 + images.length) % images.length)
                }}
              >
                &#8592;
              </button>
              <button
                className={`${styles.arrow} ${styles.arrowNext}`}
                aria-label="Next image"
                onClick={(event) => {
                  event.stopPropagation()
                  onNavigate((index + 1) % images.length)
                }}
              >
                &#8594;
              </button>
            </>
          )}
        </m.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
