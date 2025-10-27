import type { User } from 'api/types'
import { useUserByName } from 'api/user/useUser'
import { PeopleCard } from 'components/PeopleCard/PeopleCard'
import { useEffect, useState } from 'react'
import { styled } from 'styled-components'
import { Button } from 'ui-kit/Button/Button'
import { Input } from 'ui-kit/Input/Input'
import { Text } from 'ui-kit/Text/Text'

export function SearchPeople() {
  const [name, setName] = useState('')
  const [searchPeople, setSearchPeople] = useState<User>()

  const userByName = useUserByName(name, Boolean(name))

  useEffect(() => {
    if (userByName.data) {
      setSearchPeople(userByName.data)
    } else setSearchPeople(undefined)
  }, [userByName.data])

  const copy = structuredClone([1,2,3])

  console.log(copy);
  

  return (
    <PeopleContainer>
      <Form $hasButton={name !== ''}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Введи имя для поиска" />

        <ButtonWrap $hasButton={name !== ''}>
          {name !== '' && (
            <Button $height="47px" type="submit" $variant="primary">
              <Text $variant="caption">Найти</Text>
            </Button>
          )}
        </ButtonWrap>
      </Form>
      {searchPeople && <PeopleCard user={searchPeople}/>}
      {!searchPeople && <NoBodyInfo>Ни чего не найдено</NoBodyInfo>}
    </PeopleContainer>
  )
}

const Form = styled.form<{ $hasButton: boolean }>`
  padding-top: 8px;
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
const PeopleContainer = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.secondary[100]};
  padding: 16px;
  display: flex;
  flex-direction: column;
`

const NoBodyInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

