import { Copy } from './Placeholder'
import styles from './DemoVideo.module.css'

/**
 * Optional project demo. Renders only when a project sets `demo`; the detail
 * page places it in the same trailing slot as Screens, independently of the
 * gallery. `true` is a placeholder; `{ src }` embeds YouTube, Vimeo, or a file.
 */
export function DemoVideo({ demo, className = '' }) {
  const spec = demo === true ? {} : demo || {}
  const embed = getEmbed(spec.src)
  const ratio = spec.ratio || '16 / 9'
  const label = spec.title || 'Project demo'

  return (
    <figure className={`${styles.figure} ${className}`.trim()}>
      {embed?.type === 'iframe' ? (
        <div className={styles.frame} style={{ aspectRatio: ratio }}>
          <iframe
            className={styles.player}
            src={embed.src}
            title={label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>
      ) : embed?.type === 'file' ? (
        <div className={styles.frame} style={{ aspectRatio: ratio }}>
          <video className={styles.player} src={embed.src} controls playsInline preload="metadata" />
        </div>
      ) : (
        <div className={`${styles.frame} ${styles.placeholder}`} style={{ aspectRatio: ratio }}>
          <span className={styles.placeholderFlag}>Placeholder video</span>
          <span className={styles.placeholderKey}>{spec.src || 'demo'}</span>
          <span className={styles.placeholderRatio}>{ratio}</span>
        </div>
      )}

      {spec.caption ? (
        <figcaption className={styles.caption}>
          <Copy>{spec.caption}</Copy>
        </figcaption>
      ) : null}
    </figure>
  )
}

function getEmbed(src) {
  if (!src || typeof src !== 'string') return null
  const trimmed = src.trim()
  if (!trimmed) return null

  const youtube = trimmed.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{11})/,
  )
  if (youtube) {
    return { type: 'iframe', src: `https://www.youtube-nocookie.com/embed/${youtube[1]}` }
  }

  const vimeo = trimmed.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  if (vimeo) {
    return { type: 'iframe', src: `https://player.vimeo.com/video/${vimeo[1]}` }
  }

  return { type: 'file', src: trimmed }
}
