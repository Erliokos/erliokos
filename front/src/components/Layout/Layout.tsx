import { LeftMenu } from 'components/LeftMenu/LeftMenu'
import { RightMenu } from 'components/RightMenu/RightMenu'
import { Search } from 'components/Search/Search'
import React from 'react'
import { useAuthStore } from 'store/authStore'
import { styled } from 'styled-components'
import { theme } from 'theme'
import { Flex } from 'ui-kit/Flex/Flex'

type LayoutProps = {
  children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated) return children

  return (
    <Flex
      $flexDirection="column"
      $gap={'16px'}
      $bg={theme.colors.primary[100]}
      $alignItems="center"
      $justifyContent="start"
      $minHeight="100vh"
    >
      <Container>
        <LeftMenu />
        <Search />
        <RightMenu />
      </Container>
      {children}
    </Flex>
  )
}

const Container = styled.div`
  background: ${({ theme }) => theme.colors.primary[200]};
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 16px;
  gap: 16px;
`
