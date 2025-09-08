import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/Auth.page'
import { HomePage } from './pages/Home.page'
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute'


export function MainRouter() {

  const home = (
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
      }
    />
  )

  const authRoutes = (
    <Route
      path="/login"
      element={<AuthPage />}
    />
  )

  return (
    <Routes>
      {home}
      {authRoutes}
    </Routes>
  )
}
