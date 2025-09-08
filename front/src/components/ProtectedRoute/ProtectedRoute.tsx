import { useAuthCheck } from "api/auth/useAuthCheck"
import { Link } from "react-router-dom"
import { useAuthStore } from "store/authStore"


export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuthCheck()

  console.log('user', user)
  console.log('isAuthenticated', isAuthenticated)
  

  const isLoading = useAuthStore(state => state.isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return (
      <div className="guest-content">
        <p>
          Пожалуйста, войдите или зарегистрируйтесь чтобы получить доступ ко
          всем возможностям
        </p>
        <div className="action-buttons">
          <Link to="/login" className="btn btn-primary">
            Войти
          </Link>
          <Link to="/register" className="btn btn-secondary">
            Зарегистрироваться
          </Link>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
