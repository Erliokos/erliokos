import styled, { css } from 'styled-components'
import type { ButtonHTMLAttributes } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  $size?: 'sm' | 'md' | 'lg'
  $fullWidth?: boolean
  $isLoading?: boolean
  $width?: string
  $minwidth?: string
  
}

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.space[2]} ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.space[3]} ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    padding: ${({ theme }) => theme.space[4]} ${({ theme }) => theme.space[6]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `
}

const variantStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.primary[600]};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[700]};
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[800]};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary[200]};
    color: ${({ theme }) => theme.colors.secondary[900]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary[300]};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary[600]};
    border: 2px solid ${({ theme }) => theme.colors.primary[600]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primary[50]};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.secondary[700]};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondary[100]};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.error[600]};
    color: ${({ theme }) => theme.colors.white};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.error[700]};
    }
  `
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  line-height: ${({ theme }) => theme.lineHeights.none};
  transition: all 0.2s ease-in-out;
  cursor: pointer;
  border: none;
  outline: none;
  width: ${({ $width, $fullWidth }) => $fullWidth ? '100%' : $width || '100%'};
  min-width: ${({ $minwidth }) => $minwidth || 'auto'};

  ${({ $size = 'md' }) => sizeStyles[$size]};
  ${({ $variant = 'primary' }) => variantStyles[$variant]};

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.primary[500]};
    outline-offset: 2px;
  }

  ${({ $isLoading }) =>
    $isLoading &&
    css`
      opacity: 0.8;
      pointer-events: none;
    `}
`

Button.defaultProps = {
  type: 'button'
}
