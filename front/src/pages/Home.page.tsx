import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import { Text } from 'ui-kit/Text/Text'
import { Flex } from 'ui-kit/Flex/Flex'
import { Spinner } from 'ui-kit/Spiner/Spiner'
import { theme } from 'theme'



export const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Симуляция загрузки данных
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])


  if (isLoading) {
    return (
      <Flex minHeight="100vh" $alignItems="center" $justifyContent="center">
        <Spinner $size="lg" $color="primary.600" />
      </Flex>
    )
  }

  return (
    <Flex $bg={theme.colors.background} $alignItems="center" $justifyContent="center" minHeight="100vh">
      <Text>Подключиться к комнате</Text>
    </Flex>
  )
}
