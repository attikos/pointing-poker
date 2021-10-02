import React from 'react';
import { IUser } from '../../interface';
import { shortText } from '../../utils/short-text';
import s from './PlayerIcon.module.scss';

interface IProps {
  item: IUser | undefined;
}
const PlayerIcon = ({ item }: IProps): JSX.Element => {
  if (item === undefined) {
    return <div>No scram master</div>;
  }
  const getInitials = (firstName: string, lastName: string | undefined) => {
    if (lastName !== undefined && lastName !== '')
      return firstName.toUpperCase()[0] + lastName.toUpperCase()[0];
    else return firstName.toUpperCase()[0];
  };
  return (
    <div className={s.card}>
      <div className={s.noFoto}>
        {getInitials(item.firstName, item.lastName)}
      </div>
      <div className={s.info}>

        <div className={s.infoName}>
          {shortText(`${item.firstName} ${item.lastName}`, 12)}
        </div>
        <div>{item?.job}</div>
      </div>
    </div>
  );
};

export default PlayerIcon;
