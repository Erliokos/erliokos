import { useAuth } from 'api/auth/useAuth'
import { useUserByName } from 'api/user/useUser'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from 'store/authStore'
import { theme } from 'theme'
import { Button } from 'ui-kit/Button/Button'
import { Card } from 'ui-kit/Card/Card'
import { Flex } from 'ui-kit/Flex/Flex'
import { FormField } from 'ui-kit/FormField/FormField'
import { Text } from 'ui-kit/Text/Text'

type SignUpProps = object

export const SignUp: React.FC<SignUpProps> = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [errorName, setErrorName] = useState('')

  const { register, isRegistering } = useAuth()
  const { isAuthenticated, error } = useAuthStore()
  const navigate = useNavigate()

  const userByName = useUserByName(username, Boolean(username))

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Submit fired')
    register({ username, password, email })
  }

  const handleBlurName = () => {
    if(!userByName.data?.username) {
      setErrorName('')
      return
    }
    setErrorName('Такой пользователь сущевствует')
  }

  return (
    <Flex $alignItems="center" $justifyContent="center" $bg={theme.colors.primary[100]} $minHeight="100vh">
      <Card $variant="elevated" style={{ width: '400px' }}>
        <Text as="h1" $variant="h3" $bold mb={4} textAlign="center">
          Регистрация
        </Text>

        <form onSubmit={handleSubmit}>
          <Flex $flexDirection="column" $gap={theme.space[5]}>
            <FormField
              label="Имя пользователя"
              placeholder="Введите ваш username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              error={errorName}
              onBlur={handleBlurName}
            />

            <FormField
              label="Email"
              type="email"
              placeholder="Введите почту"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <FormField
              label="Пароль"
              type="password"
              placeholder="Введите ваш пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {error && (
              <Text color="error.600" textAlign="center">
                {error}
              </Text>
            )}

            <Button type="submit" $variant="primary" $size="lg" $fullWidth $isLoading={isRegistering}>
              {isRegistering ? 'Регистрация...' : 'Зарегистрироваться'}
            </Button>
            <Link to={'/login'}>Войти</Link>
          </Flex>
        </form>
      </Card>
    </Flex>
  )
}
