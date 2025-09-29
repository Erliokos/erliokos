import styled from 'styled-components'
import { Box, type BoxProps } from 'ui-kit/Box/Box'


export interface FlexProps extends BoxProps {
  $inline?: boolean
  $minHeight?: string
}

export const Flex = styled(Box)<FlexProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
  min-height: ${({$minHeight}) => $minHeight ?? 'auto'};
`

Flex.defaultProps = {
  $display: 'flex',
  $inline: false,
}
