import type { NotificationType } from "./interface";
import { useNotification } from "./useNotification";


export const useToast = () => {
  const { addNotification } = useNotification();

  const toast = {
    success: (title: string, message?: string, duration?: number) => {
      addNotification({ type: 'success', title, message, duration });
    },
    error: (title: string, message?: string, duration?: number) => {
      addNotification({ type: 'error', title, message, duration });
    },
    warning: (title: string, message?: string, duration?: number) => {
      addNotification({ type: 'warning', title, message, duration });
    },
    info: (title: string, message?: string, duration?: number) => {
      addNotification({ type: 'info', title, message, duration });
    },
    custom: (type: NotificationType, title: string, message?: string, duration?: number) => {
      addNotification({ type, title, message, duration });
    },
  };

  return toast;
};
