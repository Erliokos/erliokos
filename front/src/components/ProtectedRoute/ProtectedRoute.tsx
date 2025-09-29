import { Navigate } from 'react-router-dom'
import { useAuthCheck } from 'api/auth/useAuthCheck'

type ProtectedRouteProps = {
  element: React.JSX.Element
}

export const ProtectedRoute = ({ element }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuthCheck()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return element
}
