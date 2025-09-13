import styled from 'styled-components'
import {
  margin,
  type MarginProps,
  padding,
  type PaddingProps,
  layout,
  type LayoutProps
} from 'styled-system'

export interface BoxProps extends MarginProps, PaddingProps, LayoutProps {
  $display?: string
  $flexDirection?: string
  $alignItems?: string
  $justifyContent?: string
  $flexWrap?: string
  $gap?: string
  $bg?: string
  $opacity?: string
}

export const Box = styled.div<BoxProps>`
  display: ${({ $display }) => $display || 'block'};
  flex-direction: ${({ $flexDirection }) => $flexDirection};
  align-items: ${({ $alignItems }) => $alignItems};
  justify-content: ${({ $justifyContent }) => $justifyContent};
  flex-wrap: ${({ $flexWrap }) => $flexWrap};
  gap: ${({ $gap }) => $gap};
  background: ${({ $bg }) => $bg};
  opacity: ${({ $opacity }) => $opacity};

  ${margin}
  ${padding}
  ${layout}
`

Box.defaultProps = {
  $display: 'block'
}
