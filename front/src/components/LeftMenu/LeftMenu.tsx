import { useState } from 'react'
import { useIsDesktop } from 'hooks/responceve'
import { Link } from 'react-router-dom'
import { styled } from 'styled-components'
import BurgerIcon from 'assets/svg/burger.svg?react'
import { Icon } from 'globalStyle'
import { MobileMenu } from 'components/MobileMenu/MobileMenu'


export function LeftMenu() {
  
  const isDesktop = useIsDesktop()

  
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <LeftMenuContainer>
      {!isDesktop && (
        <>
          <BurgerButton onClick={toggleMenu}>
            <Icon as={BurgerIcon} />
          </BurgerButton>
          <MobileMenu onClose={closeMenu} isMenuOpen={isMenuOpen} />
        </>
      )}
      {isDesktop && (
        <>
          <Link to="/">Главная</Link>
          <div>/</div>
          <Link to="/game">Игры</Link>
          <div>/</div>
          <Link to="/constructor">Конструктор игр</Link>
        </>
      )}
    </LeftMenuContainer>
  )
}

// Стили
const LeftMenuContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 ${({ theme }) => theme.space[2]};
  gap: 10px;
`

const BurgerButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

