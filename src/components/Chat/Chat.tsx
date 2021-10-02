import React from 'react';
import cn from 'classnames';
import { RootStateOrAny, useSelector } from 'react-redux';
import PlayerIcon from '../PlayerIcon/PlayerIcon';
import s from './Chat.module.scss';

const Chat = () => {
  const members = useSelector((state: RootStateOrAny) => state.allData.members);

  const [message, setMessage] = React.useState('');

  const sendMessage = (event: any) => {
    event.preventDefault();
    if (message.length > 0) {
      // TODO отправка на сервер
      setMessage('');
    }
  };

  const returnMessages = () => {
    // TODO сортировка всех сообщений с сервера
    return (
      <div className={s.rows}>
        <div className={s.rowMessage}>
          <div className={s.message}>
            Hello Mark :) What do you thing about issue 1934? How many time
            would you spend to fix it?
            <div className={s.dateMessage}></div>
          </div>
          {<PlayerIcon item={members[0]} />}
        </div>
      </div>
    );
  };

  return (
    <div className={s.chatWrapper}>
      {returnMessages()}
      <form className={cn('input-group mb-3')} onSubmit={sendMessage}>
        <input
          type='text'
          className={cn('form-control')}
          onChange={(ev) => setMessage(ev.target.value)}
        />
        <button className={cn('btn btn-primary')} type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
