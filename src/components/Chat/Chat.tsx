import React, { useEffect } from 'react';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store-redux';
import s from './Chat.module.scss';
import api from '../../services/api';
import { IUser } from '../../interface';

const Chat = () => {
  const user = useSelector((state: RootState) => state.userData);
  const members = useSelector((state: RootState) => state.allData.members);
  const messages = useSelector((state: RootState) => state.allData.messages);

  const [message, setMessage] = React.useState('');

  const sendMessage = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.length > 0) {
      api.sendMessage(message);
      setMessage('');
    }
  };

  useEffect(() => {
    const messageWrapperEl = document.querySelector('.j-message-scroll');
    messageWrapperEl?.scrollTo(0, 1000);
  }, [messages]);

  const findMember = (memberId: number) => {
    return members.find( (member: IUser) => member.id === memberId);
  };

  const checkIsCurrentPlayer = (memberId: number) => {
    return user.id === memberId;
  };

  const returnMessages = () => {
    return messages.map( (msg) : React.ReactElement => {
      const isCurrentPlayer = checkIsCurrentPlayer(msg.userId);
      const author = findMember(msg.userId);
      const authorName = `${author?.firstName} ${author?.lastName}`;

      return (
        <div
          key={msg.id}
          className={cn(s.rowMessage, {
            [s.currentRowMessage] : isCurrentPlayer,
          })}
        >
          <div className={cn(s.message, {
            [s.currentPlayerMessage] : isCurrentPlayer,
          })}>
            { !isCurrentPlayer &&
              <div className={s.authorName}>{ authorName || 'noname' }</div>
            }
            {msg.message}
          </div>
        </div>);
    });
  };

  const keyDown = (e: any) => {
    if (e.code === 'Enter') {
      sendMessage(e);
    }
  };

  return (
    <div className={s.chatWrapper}>
      <p className={s.chatTitle}>Chat</p>

      <div className={cn('j-message-scroll', s.messages)}>
        {returnMessages()}
      </div>

      <form
        className={cn('input-group mb-3')}
        onSubmit={sendMessage}
        onKeyDown={(e) => keyDown(e)}
      >
        <input
          type='text'
          className={cn('form-control')}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="type a message"
        />
        <button className={cn('btn btn-primary')} type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
