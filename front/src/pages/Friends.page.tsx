import { SearchPeople } from 'components/SearchPeople/SearchPeople'
import styled from 'styled-components'

export function FriendsPage() {
  return (
    <FriendsPageContainer>
      <MyFriendsContainer>Мои друзья</MyFriendsContainer>
      <SearchPeople />
    </FriendsPageContainer>
  )
}

const FriendsPageContainer = styled.div`
  width: 100%;
  flex: 1;
  padding: 16px;
  display: flex;
  align-items: stretch;
  gap: 16px;
`

const MyFriendsContainer = styled.div`
  flex: 1;
  background: ${({ theme }) => theme.colors.secondary[100]};
  padding: 16px;
`
