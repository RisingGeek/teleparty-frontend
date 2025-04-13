'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import Notification from "./Notification"

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface NotificationItem {
  id: number;
  type: NotificationType;
  message: string;
  description: string;
};

type NotificationApi = Record<
  NotificationType,
  (config: { message: string; description: string }) => void
>;

type NotificationContextType = {
  api: NotificationApi;
  contextHolder: React.ReactNode;
  setContainer: (el: HTMLElement | null) => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

let idCounter = 0;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [container, setContainer] = useState<HTMLElement | null>(null);


  const notify = useCallback(
    (type: NotificationType, { message, description }: { message: string; description: string }) => {
      const id = idCounter++;
      setNotifications((prev) => [...prev, { id, type, message, description }]);
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, 4000);
    },
    []
  );

  const api = useMemo<NotificationApi>(() => ({
    success: (config) => notify('success', config),
    info: (config) => notify('info', config),
    warning: (config) => notify('warning', config),
    error: (config) => notify('error', config),
  }), [notify]);

  const contextHolder = container
    ? createPortal(
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
        {notifications.map((n) => (
          <Notification key={n.id} {...n} />
        ))}
      </div>,
      container
    )
    : null;

  return (
    <NotificationContext.Provider value={{ api, contextHolder, setContainer }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error('useNotification must be used within a NotificationProvider');
  return [ctx.api, ctx.contextHolder, ctx.setContainer] as const;
}
