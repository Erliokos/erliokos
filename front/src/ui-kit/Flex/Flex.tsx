import styled from 'styled-components'
import { Box, type BoxProps } from 'ui-kit/Box/Box'


export interface FlexProps extends BoxProps {
  $inline?: boolean
}

export const Flex = styled(Box)<FlexProps>`
  display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
`

Flex.defaultProps = {
  $display: 'flex',
  $inline: false,
}
