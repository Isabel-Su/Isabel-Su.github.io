import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Self-hosted variable fonts. Fraunces' `opsz` build carries both the weight and
// optical-size axes, so display sizes get finer contrast automatically via
// font-optical-sizing. Unicode-range subsetting means only the latin file is
// actually downloaded for English copy.
import '@fontsource-variable/fraunces/opsz.css'
import '@fontsource-variable/inter-tight/wght.css'

import './styles/tokens.css'
import './styles/reset.css'
import './styles/global.css'

import App from './App'

// We restore scroll position ourselves on route change; the browser's own
// restoration fights the page transition.
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* basename tracks Vite's `base`, so moving between a user page and a
        project subpath only requires changing vite.config.js. */}
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
