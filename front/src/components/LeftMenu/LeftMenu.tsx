import { useIsDesktop } from "hooks/responceve"
import { Link } from "react-router-dom"
import { styled } from "styled-components"
import BurgerIcon from 'assets/svg/burger.svg?react'


export  function LeftMenu() {

  const isDesktop = useIsDesktop()
  
  return (
    <LeftMenuContainer>
      {!isDesktop && <Icon as={BurgerIcon} />}
      {isDesktop && (
        <>
          <Link to="/game">Мои игры</Link>
          <div>/</div>
          <Link to="/constructor">Конструктор игр</Link>
        </>
      )}
    </LeftMenuContainer>
  )
}

const LeftMenuContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 0 ${({ theme }) => theme.space[2]};
  gap: 10px;
`

const Icon = styled.svg`
  stroke: ${({ theme }) => theme.colors.primary[900]};
  height: 30px;
  width: 30px;
  :hover {
    stroke: ${({ theme }) => theme.colors.primary[500]};
  }
`

