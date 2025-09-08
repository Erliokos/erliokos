import styled, { css } from 'styled-components'
import type { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  $variant?: 'outline' | 'filled' | 'flushed'
  $size?: 'sm' | 'md' | 'lg'
  $hasError?: boolean
}

const sizeStyles = {
  sm: css`
    padding: ${({ theme }) => theme.space[2]};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => theme.space[3]};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    padding: ${({ theme }) => theme.space[4]};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `
}

const variantStyles = {
  outline: css`
    border: 2px solid ${({ theme }) => theme.colors.secondary[300]};
    background-color: ${({ theme }) => theme.colors.white};

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary[500]};
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary[500]};
    }
  `,
  filled: css`
    border: 2px solid transparent;
    background-color: ${({ theme }) => theme.colors.secondary[100]};

    &:focus {
      background-color: ${({ theme }) => theme.colors.white};
      border-color: ${({ theme }) => theme.colors.primary[500]};
    }
  `,
  flushed: css`
    border-bottom: 2px solid ${({ theme }) => theme.colors.secondary[300]};
    background-color: transparent;
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary[500]};
    }
  `
}

export const Input = styled.input<InputProps>`
  width: 100%;
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all 0.2s ease-in-out;
  outline: none;

  ${({ $size = 'md' }) => sizeStyles[$size]};
  ${({ $variant = 'outline' }) => variantStyles[$variant]};

  ${({ $hasError }) =>
    $hasError &&
    css`
      border-color: ${({ theme }) => theme.colors.error[500]} !important;
      box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.error[500]} !important;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.secondary[400]};
  }
`

Input.defaultProps = {
  type: 'text'
}
