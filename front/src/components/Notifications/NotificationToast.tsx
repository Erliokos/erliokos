import { useCallback, useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Box } from 'ui-kit/Box/Box'
import type { NotificationType, Notification } from './interface'
import { Flex } from 'ui-kit/Flex/Flex'
import { Button } from 'ui-kit/Button/Button'
import { Text } from 'ui-kit/Text/Text'

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`

const slideOut = keyframes`
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
`

const ToastContainer = styled(Box)<{ $isClosing: boolean; $position: string }>`
  animation: ${({ $isClosing }) => ($isClosing ? slideOut : slideIn)} 0.3s
    ease-in-out;
  margin-bottom: ${({ theme }) => theme.space[2]};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  background: ${({ theme }) => theme.colors.white};
  overflow: hidden;
  max-width: 400px;
  z-index: 100;
`

const getNotificationStyles = (type: NotificationType) => {
  const styles = {
    success: {
      bg: 'success.50',
      borderColor: 'success.500',
      icon: '✅'
    },
    error: {
      bg: 'error.50',
      borderColor: 'error.500',
      icon: '❌'
    },
    warning: {
      bg: 'warning.50',
      borderColor: 'warning.500',
      icon: '⚠️'
    },
    info: {
      bg: 'primary.50',
      borderColor: 'primary.500',
      icon: 'ℹ️'
    }
  }

  return styles[type]
}

interface NotificationToastProps {
  notification: Notification
  onClose: () => void
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  notification,
  onClose
}) => {
  const [isClosing, setIsClosing] = useState(false)
  const styles = getNotificationStyles(notification.type)

  const handleClose = useCallback(() => {
    setIsClosing(true)
    setTimeout(() => onClose(), 300)
  }, [onClose])

  // Автозакрытие
  useEffect(() => {
    if (notification.duration !== 0) {
      const timer = setTimeout(handleClose, notification.duration || 5000)
      return () => clearTimeout(timer)
    }
  }, [handleClose, notification.duration])

  return (
    <ToastContainer
      $bg={styles.bg}
      padding={4}
      $isClosing={isClosing}
      $position={notification.position || 'top-right'}
    >
      <Grid>
        <Flex $gap={'10px'}>
          <Text fontSize="xl">{styles.icon}</Text>
          <Flex $flexDirection='column'>
            <Text $bold color="secondary.900" marginBottom={1}>
              {notification.title}
            </Text>
            {notification.message && (
              <Text color="secondary.600" fontSize="sm">
                {notification.message}
              </Text>
            )}
          </Flex>
        </Flex>
        <Button
          $variant="ghost"
          $size="sm"
          onClick={handleClose}
          aria-label="Close notification"
        >
          ✕
        </Button>
      </Grid>
    </ToastContainer>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: 250px 50px;
  gap: 10px;
`
