import { Route, Routes } from 'react-router-dom'
import { AuthPage } from './pages/Auth.page'
import { HomePage } from './pages/Home.page'
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute'
import { GamePage } from 'pages/Game.page'
import { СonstructoPage } from 'pages/Сonstructor.page'
import { MyGamePage } from 'pages/MyGame.page'
import { FavoritesPage } from 'pages/Favorites.page'
import { SignUp } from 'pages/Signup.page'
import { FriendsPage } from 'pages/Friends.page'
import React from 'react'

const ProfilePageLazy = React.lazy(() => import('pages/Profile.page'))

export function MainRouter() {
  const home = <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
  const profile = <Route path="/profile" element={<ProtectedRoute element={<ProfilePageLazy />} />} />
  const authRoutes = <Route path="/login" element={<AuthPage />} />
  const signup = <Route path="/registration" element={<SignUp />} />
  const game = <Route path="/game" element={<ProtectedRoute element={<GamePage />} />} />
  const constructor = <Route path="/constructor" element={<ProtectedRoute element={<СonstructoPage />} />} />
  const mygame = <Route path="/mygame" element={<ProtectedRoute element={<MyGamePage />} />} />
  const favorites = <Route path="/favorites" element={<ProtectedRoute element={<FavoritesPage />} />} />
  const friends = <Route path="/friends" element={<ProtectedRoute element={<FriendsPage />} />} />

  return (
    <Routes>
      {home}
      {authRoutes}
      {profile}
      {game}
      {constructor}
      {mygame}
      {favorites}
      {signup}
      {friends}
    </Routes>
  )
}
