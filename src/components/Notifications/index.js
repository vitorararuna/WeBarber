import React, { useState, useEffect, useMemo } from 'react';
import { MdNotifications } from 'react-icons/md';
import { parseISO, formatDistance } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';

import { Container, Badge, NotificationList, Notification, Scroll, } from './styles';

export default function Notifications() {

  const [visible, setVisible] = useState(false);
  const [notifications, setNotifications] = useState([false]);

  const hasUnread = useMemo(
    () => !!notifications.find(notification => notification.read === false),  // "!!" para ele me retornar um boolean
    [notifications]
  );

  useEffect(() => {
    async function loadNotifications() {
      const response = await api.get('notifications');

      const data = response.data.map(notification => ({
        ...notification,
        timeDistance: formatDistance(  //pegando todas as notifcantions e adicionando essa nova informação pra ela 
          parseISO(notification.createdAt),
          new Date(),
          { addSuffix: true, locale: pt }
        ),
      }));
      setNotifications(data);
    }
    loadNotifications();
  }, []);

  function handleToggleVisiblw() {
    setVisible(!visible);
  }

  async function handleMarkAsRead(id) {
    await api.put(`notifications/${id}`);

    setNotifications(
      notifications.map(notification => (
        notification._id === id ? { ...notification, read: true } : notification
      ))
    );
  }

  return (
    <Container>
      {/* hasUnread = true quando tiver alguma notificação não lida */}
      <Badge onClick={handleToggleVisiblw} hasUnread={hasUnread}>
        <MdNotifications color="#7159c1" size={20} />
      </Badge>

      <NotificationList visible={visible}>
        <Scroll>
          {notifications.map(notification => (
            <Notification unread={!notification.read}>
              <p>{notification.content}</p>
              <time>{notification.timeDistance}</time>
              {!notification.read && (
                <button onClick={() => handleMarkAsRead(notification._id)} type="button">Marcar como lida</button>
              )}
              
            </Notification>
          ))}
        </Scroll>
      </NotificationList>
    </Container>
  );
}