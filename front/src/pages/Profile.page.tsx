import { useToast } from 'components/Notifications/useToast'
import { Button } from 'ui-kit/Button/Button'
import { Flex } from 'ui-kit/Flex/Flex'

export function ProfilePage() {
    const toast = useToast()

    const handleSuccess = () => {
      toast.success('Успех!', 'Операция выполнена успешно')
    }

    const handleError = () => {
      toast.error('Ошибка!', 'Что-то пошло не так')
    }

    const handleLoginSuccess = () => {
      toast.success('Вход выполнен', 'Добро пожаловать!', 3000)
    }

    return (
      <Flex $gap={'10px'}>
        <Button $variant="primary" onClick={handleSuccess}>
          Успех
        </Button>
        <Button $variant="danger" onClick={handleError}>
          Ошибка
        </Button>
        <Button $variant="primary" onClick={handleLoginSuccess}>
          Войти
        </Button>
      </Flex>
    )
}

