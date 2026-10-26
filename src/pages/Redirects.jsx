import { Navigate, useParams } from 'react-router-dom'

export function RedirectHome() {
  return <Navigate to="/" replace />
}

export function RedirectLife() {
  const { slug } = useParams()
  return <Navigate to={slug ? `/life/${slug}` : '/life'} replace />
}
