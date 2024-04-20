import React, { useState } from 'react'
import { useLoadingContext } from '../context/LoadingContext';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import Service from '../utils/Service';
import useAuthContext from '../context/AuthContext';

const Chat = ({messages, currentTeamId}) => {
    const [t, i18n] = useTranslation('global');
    const [message, setMessage] = useState('');
    const { startLoading, stopLoading } = useLoadingContext();
    const { user } = useAuthContext();

    const sendMessage = async () => {
      startLoading(); 
      try {
          await Service.sendMessage(message, currentTeamId); 
          setMessage('');
      } catch (error) {
          toast.error(t('phrazes.somethingWentWrong'))
      } finally {
        stopLoading(); 
      }
  };

  const convertToLocale = (utcTimestamp) => {
    const utcDate = new Date(utcTimestamp);
    const hours = utcDate.getHours();
    const minutes = utcDate.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`; 
  };


  return (
    <div className='chat'>
        <div className="chat-messages">
          {messages && messages.map((msg, index) => (
            <div key={index} className={`message ${msg.user === user.name ? 'sent-by-current-user' : 'sent-by-other-user'}`}>
              <div className="message-top">
                <span className="message-user">{msg.user}</span>
                <span className="message-time">{convertToLocale(msg.created_at)}</span>
              </div>
              <span className="message-text">{msg.message}</span>
            </div>
          ))}
        </div>
        <textarea value={message} name="message" id="" onChange={(e) => setMessage(e.target.value)} placeholder={t('chat.placeholder')} cols="30" rows="2"></textarea>
        <button className="chat-btn" onClick={sendMessage}>
            {t('chat.btn')}
        </button>
    </div>
  )
}

export default Chat
