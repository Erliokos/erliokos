import type { User } from 'api/types'
import { Icon, media } from 'globalStyle'
import { useAuthStore } from 'store/authStore'
import { styled } from 'styled-components'
import { Button } from 'ui-kit/Button/Button'
import { Flex } from 'ui-kit/Flex/Flex'
import { Text } from 'ui-kit/Text/Text'
import BurgerIcon from 'assets/svg/pencil.svg?react'
import { useUser } from 'api/user/useUser'

const defaultUser: User = {
  id: '',
  username: '',
  created_at: Date.now(),
}

function ProfilePage() {
  const { user } = useAuthStore()

  const { updateAvatar } = useUser()

  if (!user) return null

  const userKeys = Object.keys(user ?? defaultUser) as Array<keyof User>

  const handleChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      updateAvatar(e.target.files[0])
    }
  }

  return (
    <Container>
      <UserInfo>
        <UserInfoImageContainer>
          <EditAvatarIcon>
            <Icon as={BurgerIcon} />
            <input onChange={handleChangeAvatar} style={{ display: 'none' }} type="file" accept="image/*" />
          </EditAvatarIcon>
          <UserInfoImage
            src={user.avatar_url ? `http://localhost:3001/${user.avatar_url}` : 'images/noname.png'}
          />
          <Flex $alignItems='flex-end' $gap="16px">
            <Button $size="sm" $variant="outline">
              Редактировать профиль
            </Button>
          </Flex>
        </UserInfoImageContainer>
        <UserInfoText>
          {user &&
            userKeys.map((item) => {
              if(item === 'avatar_url') return null
              return (
                <UserInfoTextRow>
                  <Text padding={'8px'} $variant="caption">
                    {item}:
                  </Text>
                  <Text padding={'8px'} $bold $variant="body">
                    {user[item]?.toString() ?? '-'}
                  </Text>
                </UserInfoTextRow>
              )
            })}
        </UserInfoText>
      </UserInfo>
    </Container>
  )
}

export default ProfilePage

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: stretch;
  flex-direction: column;
  gap: 16px;
  ${media.sm`
    padding: 16px;
  `}
`

const UserInfo = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex-direction: column;
  ${media.sm`
    flex-direction: row;
  `}
`
const UserInfoImageContainer = styled.div`
  position: relative;
  flex: 1;
  background: ${({ theme }) => theme.colors.secondary[100]};
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const UserInfoImage = styled.img`
  align-items: center;
  background: ${({ theme }) => theme.colors.secondary[100]};
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: ${({ theme }) => theme.shadows.md};
`
const UserInfoText = styled.div`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.colors.secondary[100]};
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  ${media.md`
    flex: 2;
  `}
`

const UserInfoTextRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;
  flex-direction: column;
  & > :first-child {
    flex: 1;
    background: ${({ theme }) => theme.colors.secondary[200]};
  }
  ${media.md`
    flex-direction: row;
    align-items: center;
  `}
`

const EditAvatarIcon = styled.label`
  cursor: pointer;
  position: absolute;
  top: 16px;
  left: 16px;
`
