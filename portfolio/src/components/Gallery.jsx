import { useState } from 'react'
import { Figure } from './Figure'
import { Lightbox } from './Lightbox'
import { Stagger, StaggerItem } from '../motion/Reveal'
import styles from './Gallery.module.css'

/**
 * Image grid used by both hobby modes and by project screenshot strips.
 *
 * variant 'masonry' — CSS multi-column, so mixed portrait/landscape photos pack
 *                     without gaps. No JS measuring, no resize listeners.
 * variant 'row'     — even grid, for a small consistent set of photos.
 */
export function Gallery({ images = [], variant = 'masonry', lightbox = false, sizes }) {
  const [openIndex, setOpenIndex] = useState(null)

  if (!images.length) return null

  const isMasonry = variant === 'masonry'
  const defaultSizes = isMasonry
    ? '(max-width: 640px) 100vw, (max-width: 1024px) 48vw, 31vw'
    : '(max-width: 640px) 100vw, 32vw'

  return (
    <>
      <Stagger className={isMasonry ? styles.masonry : styles.row}>
        {images.map((image, i) => {
          const figure = (
            <Figure
              image={image}
              sizes={sizes || defaultSizes}
              showCaption={!lightbox}
              className={styles.figure}
            />
          )

          return (
            <StaggerItem key={image.key} className={styles.item} tight>
              {lightbox ? (
                <button
                  type="button"
                  className={styles.trigger}
                  onClick={() => setOpenIndex(i)}
                  aria-label={image.alt ? `Expand: ${image.alt}` : 'Expand image'}
                >
                  {figure}
                </button>
              ) : (
                figure
              )}
            </StaggerItem>
          )
        })}
      </Stagger>

      {lightbox && (
        <Lightbox
          images={images}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </>
  )
}
