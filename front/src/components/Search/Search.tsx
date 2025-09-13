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
    <form onSubmit={handleConnect}>
      <Grid hasButton={roomId !== ''}>
        <Input
          value={roomId}
          onChange={e => setRomId(e.target.value)}
          placeholder="Введи ID комнаты"
        />

        <ButtonWrap hasButton={roomId !== ''}>
          {roomId !== '' && (
            <Button type="submit" $variant="primary" $size="lg">
              <Text $variant="caption">Войти</Text>
            </Button>
          )}
        </ButtonWrap>
      </Grid>
    </form>
  )
}

const Grid = styled.div<{ hasButton: boolean }>`
  flex: 1;
  display: grid;
  justify-content: center;
  gap: ${({ hasButton }) => (hasButton ? '10px' : '0px')};
  grid-template-columns: ${({ hasButton }) =>
    hasButton ? '280px 70px' : '360px 0px'};
  transition: 500ms;
`
const ButtonWrap = styled.div<{ hasButton: boolean }>`
  opacity: ${({ hasButton }) => (hasButton ? '100%' : '0%')};
  transition: 2000ms;
`
