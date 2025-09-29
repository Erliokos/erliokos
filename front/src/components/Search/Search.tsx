import { useState } from 'react'
import { styled } from 'styled-components'
import { Button } from 'ui-kit/Button/Button'
import { Input } from 'ui-kit/Input/Input'
import { Text } from 'ui-kit/Text/Text'

export function Search() {

  const [roomId, setRomId] = useState('')

    const handleConnect = (e: React.FormEvent) => {
      e.preventDefault()
    }
  
  return (
    <Form onSubmit={handleConnect} $hasButton={roomId !== ''}>
      <Input value={roomId} onChange={(e) => setRomId(e.target.value)} placeholder="Введи ID комнаты" />

      <ButtonWrap $hasButton={roomId !== ''}>
        {roomId !== '' && (
          <Button $height='47px' type="submit" $variant="primary">
            <Text $variant="caption">Войти</Text>
          </Button>
        )}
      </ButtonWrap>
    </Form>
  )
}

const Form = styled.form<{ $hasButton: boolean }>`
  flex: 1;
  justify-content: flex-start;
  display: flex;
  gap: ${({ $hasButton }) => ($hasButton ? '10px' : '0px')};
  transition: 500ms;
`
const ButtonWrap = styled.div<{ $hasButton: boolean }>`
  opacity: ${({ $hasButton }) => ($hasButton ? '100%' : '0%')};
  transition: 2000ms;
  height: 47px;
`


