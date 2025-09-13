import { createContext } from "react";
import type { Notification, NotificationContextType } from "./interface";

export interface NotificationState {
  notifications: Notification[];
}

export type NotificationAction =
  | { type: "ADD_NOTIFICATION"; payload: Notification }
  | { type: "REMOVE_NOTIFICATION"; payload: string }
  | { type: "CLEAR_ALL" };

export const notificationReducer = (
  state: NotificationState,
  action: NotificationAction
): NotificationState => {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return { ...state, notifications: [...state.notifications, action.payload] };
    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload),
      };
    case "CLEAR_ALL":
      return { ...state, notifications: [] };
    default:
      return state;
  }
};

export const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
)

