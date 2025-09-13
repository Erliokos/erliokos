import { useAuth } from 'api/auth/useAuth'
import { useIsDesktop } from 'hooks/responceve'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export function RightMenu() {
  const { logout } = useAuth()

  const isDesktop = useIsDesktop()

  const handleLogout = () => {
    logout()
  }

  if (!isDesktop) return null

  return (
    <RightMenuContainer>
      <Link to="/profile">Профиль</Link>
      <div>/</div>
      <Link to="/" onClick={handleLogout}>
        Выход
      </Link>
    </RightMenuContainer>
  )
}

const RightMenuContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 ${({ theme }) => theme.space[2]};
  gap: 10px;
`
