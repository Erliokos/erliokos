import { useAuth } from "api/auth/useAuth"
import { useToast } from "components/Notifications/useToast"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "store/authStore"
import { theme } from "theme"
import { Button } from "ui-kit/Button/Button"
import { Card } from "ui-kit/Card/Card"
import { Flex } from "ui-kit/Flex/Flex"
import { FormField } from "ui-kit/FormField/FormField"
import { Text } from 'ui-kit/Text/Text'


type AuthPageProps = object

export const AuthPage: React.FC<AuthPageProps> = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoggingIn } = useAuth()
  const { isAuthenticated, error } = useAuthStore()
  const navigate = useNavigate()
  const toast = useToast()


    useEffect(() => {
      if (isAuthenticated) {
        console.log('YES');
        toast.success('Вход выполнен успешно')
        navigate('/', { replace: true })
        // setTimeout(() => {
        //   navigate('/', { replace: true })
        // }, 2000)
      }
    // tost не должен обновляться
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <Flex $alignItems="center" $justifyContent="center" $bg={theme.colors.primary[100]} minHeight="100vh">
      <Card $variant="elevated" style={{ width: '400px' }}>
        <Text as="h1" $variant="h3" $bold mb={4} textAlign="center">
          Вход в систему
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex $flexDirection="column" $gap={theme.space[5]}>
            <FormField
              label="Имя пользователя"
              placeholder="Введите ваш username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />

            <FormField
              label="Пароль"
              type="password"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            {error && (
              <Text color="error.600" textAlign="center">
                {error}
              </Text>
            )}

            <Button
              type="submit"
              $variant="primary"
              $size="lg"
              $fullWidth
              $isLoading={isLoggingIn}
            >
              {isLoggingIn ? 'Вход...' : 'Войти'}
            </Button>
          </Flex>
        </form>
      </Card>
    </Flex>
  )
}
