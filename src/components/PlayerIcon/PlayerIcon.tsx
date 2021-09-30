import React from 'react';
import { IUser } from '../../interface';
import s from './PlayerIcon.module.scss';

const PlayerIcon = (props: { item: IUser | undefined }):JSX.Element => {
  if (props.item === undefined) {
    return <div>No scram master</div>;
  }
  const getInitials = (firstName: string, lastName: string | undefined) => {
    return firstName.toUpperCase()[0] + lastName?.toUpperCase()[0];
  };
  return (
    <div className={s.card}>
      <div className={s.noFoto}>
        {getInitials(props.item.firstName, props.item.lastName)}
      </div>
      <div className={s.info}>
        {props.item.isDiller ? <div>It&apos;s you</div> : null}
        <div className={s.infoName}>
          {props.item.firstName} {props.item?.lastName}
        </div>
        <div>{props.item?.job}</div>
      </div>
    </div>
  );
};

export default PlayerIcon;
