import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/Auth.page'
import { HomePage } from './pages/Home.page'
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute'
import { ProfilePage } from 'pages/Profile.page'
import { GamePage } from 'pages/Game.page'
import { СonstructoPage } from 'pages/Сonstructor.page'


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
  const profile = <Route path="/profile" element={<ProfilePage />} />
  const authRoutes = <Route path="/login" element={<AuthPage />} />
  const game = <Route path="/game" element={<GamePage />} />
  const constructor = <Route path="/constructor" element={<СonstructoPage />} />

  return (
    <Routes>
      {home}
      {authRoutes}
      {profile}
      {game}
      {constructor}
    </Routes>
  )
}
