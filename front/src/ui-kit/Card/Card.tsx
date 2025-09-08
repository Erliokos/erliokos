import styled from 'styled-components'

export interface CardProps {
  $variant?: 'elevated' | 'outline' | 'filled'
}

export const Card = styled.div<CardProps>`
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.space[6]};
  background-color: ${({ theme }) => theme.colors.white};

  ${({ $variant = 'elevated', theme }) => {
    switch ($variant) {
      case 'elevated':
        return `
          box-shadow: ${theme.shadows.md};
        `
      case 'outline':
        return `
          border: 1px solid ${theme.colors.secondary[200]};
        `
      case 'filled':
        return `
          background-color: ${theme.colors.secondary[50]};
        `
      default:
        return ''
    }
  }}
`
