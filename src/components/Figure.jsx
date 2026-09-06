import { useState } from 'react'
import { getImage } from '../lib/images'
import { Copy } from './Placeholder'
import styles from './Figure.module.css'

/**
 * The only image component on the site.
 *
 * Two jobs:
 *   1. Never shift layout. The frame reserves its space via CSS aspect-ratio
 *      before anything downloads, so nothing below it ever jumps.
 *   2. Degrade into a labelled placeholder when the file does not exist yet,
 *      which is what makes an unfinished gallery still look deliberate.
 *
 * @param {{key:string, ratio:string, alt:string, caption?:string}} image
 * @param {boolean} priority  true for above-the-fold images (skips lazy loading)
 * @param {string}  sizes     responsive sizes hint; match the layout width
 */
export function Figure({
  image,
  priority = false,
  sizes = '(max-width: 720px) 100vw, 50vw',
  className = '',
  showCaption = true,
  ...rest
}) {
  const [loaded, setLoaded] = useState(false)
  const resolved = image?.key ? getImage(image.key) : null
  const ratio = image?.ratio || '4 / 3'

  const frameStyle = { aspectRatio: ratio }

  if (!resolved) {
    return (
      <figure className={`${styles.figure} ${className}`} {...rest}>
        <div className={`${styles.frame} ${styles.placeholder}`} style={frameStyle}>
          <span className={styles.placeholderFlag}>Placeholder image</span>
          <span className={styles.placeholderKey}>{image?.key || 'image'}</span>
          <span className={styles.placeholderRatio}>{ratio}</span>
        </div>
        {showCaption && image?.caption ? (
          <figcaption className={styles.caption}>
            <Copy>{image.caption}</Copy>
          </figcaption>
        ) : null}
      </figure>
    )
  }

  return (
    <figure className={`${styles.figure} ${className}`} {...rest}>
      <div className={styles.frame} style={frameStyle}>
        <picture>
          {resolved.avif && <source type="image/avif" srcSet={resolved.avif} sizes={sizes} />}
          {resolved.webp && <source type="image/webp" srcSet={resolved.webp} sizes={sizes} />}
          <img
            className={`${styles.img} ${loaded ? styles.imgLoaded : ''}`}
            src={resolved.src}
            srcSet={resolved.srcSet || undefined}
            sizes={resolved.srcSet ? sizes : undefined}
            alt={image?.alt ?? ''}
            loading={priority ? 'eager' : 'lazy'}
            decoding={priority ? 'sync' : 'async'}
            fetchPriority={priority ? 'high' : 'auto'}
            onLoad={() => setLoaded(true)}
            draggable={false}
          />
        </picture>
      </div>
      {showCaption && image?.caption ? (
          <figcaption className={styles.caption}>
            <Copy>{image.caption}</Copy>
          </figcaption>
        ) : null}
    </figure>
  )
}
