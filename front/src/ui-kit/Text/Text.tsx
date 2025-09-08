import styled from 'styled-components'
import {
  typography,
  type TypographyProps,
  space,
  type SpaceProps,
  color,
  type ColorProps
} from 'styled-system'
import { theme } from 'theme'

export interface TextProps extends TypographyProps, SpaceProps, ColorProps {
  $variant?: 'body' | 'caption' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  $bold?: boolean
  $italic?: boolean
  $underline?: boolean
  $strike?: boolean
}

const variantStyles = {
  h1: {
    fontSize: '2.25rem',
    fontWeight: 'bold',
    lineHeight: '2.5rem'
  },
  h2: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    lineHeight: '2.25rem'
  },
  h3: {
    fontSize: '1.5rem',
    fontWeight: 'semibold',
    lineHeight: '2rem'
  },
  h4: {
    fontSize: '1.25rem',
    fontWeight: 'semibold',
    lineHeight: '1.75rem'
  },
  h5: {
    fontSize: '1.125rem',
    fontWeight: 'medium',
    lineHeight: '1.75rem'
  },
  h6: {
    fontSize: '1rem',
    fontWeight: 'medium',
    lineHeight: '1.5rem'
  },
  body: {
    fontSize: '1rem',
    fontWeight: 'normal',
    lineHeight: '1.5rem'
  },
  caption: {
    fontSize: '0.875rem',
    fontWeight: 'normal',
    lineHeight: '1.25rem'
  }
}

export const Text = styled.span<TextProps>`
  ${({ $variant = 'body' }) => variantStyles[$variant]};
  font-weight: ${({ $bold }) => ($bold ? 'bold' : 'inherit')};
  font-style: ${({ $italic }) => ($italic ? 'italic' : 'normal')};
  text-decoration: ${({ $underline, $strike }) => {
    if ($underline && $strike) return 'underline line-through'
    if ($underline) return 'underline'
    if ($strike) return 'line-through'
    return 'none'
  }};

  ${typography}
  ${space}
  ${color}
`

Text.defaultProps = {
  $variant: 'body',
  color: theme.colors.white
}
