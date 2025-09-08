import styled, { keyframes } from 'styled-components'

export interface SpinnerProps {
  $size?: 'sm' | 'md' | 'lg'
  $color?: string
}

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const sizeMap = {
  sm: '16px',
  md: '24px',
  lg: '32px'
}

export const Spinner = styled.div<SpinnerProps>`
  border: 2px solid
    ${({ theme, $color }) => $color || theme.colors.primary[200]};
  border-top: 2px solid
    ${({ theme, $color }) => $color || theme.colors.primary[600]};
  border-radius: 50%;
  width: ${({ $size = 'md' }) => sizeMap[$size]};
  height: ${({ $size = 'md' }) => sizeMap[$size]};
  animation: ${spin} 1s linear infinite;
`
