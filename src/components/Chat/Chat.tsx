import React from 'react';
import cn from 'classnames';
import { RootStateOrAny, useSelector } from 'react-redux';
import { RootState } from '../../store/store-redux';
import PlayerIcon from '../PlayerIcon/PlayerIcon';
import s from './Chat.module.scss';
import api from '../../services/api';
import { IMessage, IUser } from '../../interface';

const Chat = () => {
  const members = useSelector((state: RootState) => state.allData.members);
  const messages = useSelector((state: RootState) => state.allData.messages);

  const [message, setMessage] = React.useState('');

  const sendMessage = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.length > 0) {
      // TODO отправка на сервер
      api.sendMessage(message);
      setMessage('');
    }
  };

  const findMember = (userId: number) => {
    return members.find( (user: IUser) => user.id === userId);
  };

  const returnMessages = () => {
    return messages.map( (msg) : React.ReactElement => {
      const member = findMember(msg.userId);

      return (<div className={s.rows} key={msg.id}>
        <div className={s.rowMessage}>
          <div className={s.message}>
            {msg.message}
            <div className={s.dateMessage}></div>
          </div>

          { member ? <PlayerIcon item={member} /> : <div>noname</div> }
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
      {returnMessages()}
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
        />
        <button className={cn('btn btn-primary')} type='submit'>
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
