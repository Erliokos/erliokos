import type { User } from "api/types"
import styled from "styled-components"
import { Button } from "ui-kit/Button/Button"
import { Flex } from "ui-kit/Flex/Flex"
import { Text } from "ui-kit/Text/Text"

type PeopleCardProps = {
  user: User
}

export function PeopleCard({user}: PeopleCardProps) {
  return (
    <PeopleCardContainer>
      <UserImage src={user.avatar_url ? `http://localhost:3001/${user.avatar_url}` : 'images/noname.png'} />
      <InformationContainer>
        <Row>
          <Text $variant="caption">ID:</Text>
          <Text $bold>{user.id}</Text>
        </Row>
        <Row>
          <Text $variant="caption">Имя пользователя:</Text>
          <Text $bold>{user.username}</Text>
        </Row>
        <Flex $gap="8px">
          <Button $variant="outline" $size="sm">
            Добавить в друзья
          </Button>
          <Button $variant="outline" $size="sm">
            Написать сообщение
          </Button>
          <Button $variant="outline" $size="sm">
            Заблокировать
          </Button>
        </Flex>
      </InformationContainer>
    </PeopleCardContainer>
  )
}

const PeopleCardContainer = styled.div`
  border-radius: 8px;
  margin-top: 16px;
  padding: 16px;
  background: ${({ theme }) => theme.colors.secondary[300]};
  display: flex;
  align-items: stretch;
  gap: 16px;
  height: 200px;
`

const Row = styled.div`
  border-radius: 4px;
  flex: 1;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  background: ${({ theme }) => theme.colors.secondary[100]};
`

const UserImage = styled.img`
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary[100]};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadows.md};
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`
