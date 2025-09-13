import { NotificationToast } from './NotificationToast'
import styled from 'styled-components'
import { useNotification } from './useNotification'

const Container = styled.div<{ $position: string }>`
  position: fixed;
  z-index: 10000;
  padding: ${({ theme }) => theme.space[4]};
  max-height: 100vh;
  overflow-y: auto;

  ${({ $position }) => {
    switch ($position) {
      case 'top-right':
        return `
          top: 0;
          right: 0;
        `
      case 'top-left':
        return `
          top: 0;
          left: 0;
        `
      case 'bottom-right':
        return `
          bottom: 0;
          right: 0;
        `
      case 'bottom-left':
        return `
          bottom: 0;
          left: 0;
        `
      default:
        return `
          top: 0;
          right: 0;
        `
    }
  }}
`

export const NotificationContainer: React.FC = () => {
  const { notifications, removeNotification } = useNotification()

  // Группируем уведомления по позициям
  const groupedNotifications = notifications.reduce((acc, notification) => {
    const position = notification.position || 'top-right'
    if (!acc[position]) {
      acc[position] = []
    }
    acc[position].push(notification)
    return acc
  }, {} as Record<string, typeof notifications>)

  return (
    <>
      {Object.entries(groupedNotifications).map(
        ([position, positionNotifications]) => (
          <Container key={position} $position={position}>
            {positionNotifications.map(notification => (
              <NotificationToast
                key={notification.id}
                notification={notification}
                onClose={() => removeNotification(notification.id)}
              />
            ))}
          </Container>
        )
      )}
    </>
  )
}
