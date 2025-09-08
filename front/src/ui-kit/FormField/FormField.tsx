import styled from 'styled-components'
import { Input, type InputProps } from 'ui-kit/Input/Input'
import { Text } from '../Text/Text'


export interface FormFieldProps extends InputProps {
  label?: string
  error?: string
  helperText?: string
}

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space[2]};
`

const ErrorText = styled(Text)`
  color: ${({ theme }) => theme.colors.error[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

const HelperText = styled(Text)`
  color: ${({ theme }) => theme.colors.secondary[600]};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  $hasError,
  ...inputProps
}) => {
  return (
    <StyledFormField>
      {label && (
        <Text as="label" $variant="caption" $bold>
          {label}
        </Text>
      )}
      <Input $hasError={$hasError || !!error} {...inputProps} />
      {error && <ErrorText>{error}</ErrorText>}
      {helperText && !error && <HelperText>{helperText}</HelperText>}
    </StyledFormField>
  )
}
