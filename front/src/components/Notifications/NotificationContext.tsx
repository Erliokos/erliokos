import React, { useReducer } from 'react'
import type { Notification } from './interface'
import { NotificationContext, notificationReducer } from './NotificationReducer'


export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  })

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    dispatch({ type: 'ADD_NOTIFICATION', payload: { ...notification, id } })

    if (notification.duration !== 0) {
      setTimeout(() => removeNotification(id), notification.duration || 5000)
    }
  }

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })
  }

  const clearAll = () => {
    dispatch({ type: 'CLEAR_ALL' })
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications: state.notifications,
        addNotification,
        removeNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
