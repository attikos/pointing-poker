import { IMembers } from '../../interface';
import s from './PlayerIcon.module.scss';



const PlayerIcon = (props: {item: IMembers | undefined} ) => {
  if(props.item === undefined) {
      return <div>No sram master</div>
  }
  const getInitials = (firstName:string, lastName:string|undefined) => {
      return firstName.toUpperCase()[0] + lastName?.toUpperCase()[0];
  }
  return (
    <div className={s.scramMasterCard}>
      <div className={s.noFoto}>
        {getInitials(props.item.first_name, props.item.last_name)}
      </div>
      <div className={s.scramMasterInfo}>
      {(props.item.is_diller) ? (<div>It's you</div>) : null}
        <div className={s.scramMasterInfoName}>
          {props.item.first_name} {props.item?.last_name}
        </div>
        <div>{props.item?.job}</div>
      </div>
    </div>
  );
};

export default PlayerIcon;
