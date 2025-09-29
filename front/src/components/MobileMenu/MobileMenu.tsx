import { styled } from "styled-components"
import CloseIcon from 'assets/svg/close.svg?react'
import { Icon } from "globalStyle"
import { Link } from 'react-router-dom'
import { useAuth } from "api/auth/useAuth"

type MobileMenuProps = {
  onClose: () => void
  isMenuOpen: boolean
}


export const MobileMenu: React.FC<MobileMenuProps> = ({ onClose, isMenuOpen }) => {

  const { logout } = useAuth()

    const handleLogout = () => {
      logout()
    }

  return (
    <>
      <Overlay $isVisible={isMenuOpen} onClick={onClose} />
      <Container $isOpen={isMenuOpen}>
        <MenuHeader>
          <CloseButton onClick={onClose}>
            <Icon as={CloseIcon} />
          </CloseButton>
        </MenuHeader>
        <MenuContent>
          <MobileLink to="/" onClick={onClose}>
            Главная
          </MobileLink>
          <MobileLink to="/game" onClick={onClose}>
            Игры
          </MobileLink>
          <MobileLink to="/constructor" onClick={onClose}>
            Конструктор игр
          </MobileLink>
          <MobileLink to="/favorites" onClick={onClose}>
            Избранное
          </MobileLink>
          <MobileLink to="/mygame" onClick={onClose}>
            Мои игры
          </MobileLink>
          <MobileLink to="/profile" onClick={onClose}>
            Профиль
          </MobileLink>
          <MobileLink to="/" onClick={handleLogout}>
            Выход
          </MobileLink>
        </MenuContent>
      </Container>
    </>
  )
}

const Overlay = styled.div<{ $isVisible: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 998;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  visibility: ${({ $isVisible }) => ($isVisible ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0.3s ease;
`

const Container = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background-color: ${({ theme }) => theme.colors.primary[100]};
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '-100%')});
  transition: transform 0.3s ease;
  display: flex;
  flex-direction: column;
`

const MenuHeader = styled.div`
  padding: ${({ theme }) => theme.space[3]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
  display: flex;
  justify-content: flex-end;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const MenuContent = styled.div`
  padding: ${({ theme }) => theme.space[4]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[3]};
`

const MobileLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  padding: ${({ theme }) => theme.space[2]} 0;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.primary[500]};
  }
`

