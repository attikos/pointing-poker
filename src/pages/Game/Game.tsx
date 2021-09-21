import React from 'react';
import cn from 'classnames';
import s from './Game.module.scss';
import { useSelector} from 'react-redux';
import { RootState } from '../../store/store-redux';

const Game = () => {
  const playerOrMaster = useSelector(
    (state: RootState) => state.playerOrMaster
  );

  return (
    <div className={s.game}>
      <div className={s.mainUnit}>
        <div>Компонент с spring planning</div>
        <div>
          <div>Компонент scram master </div>
          {playerOrMaster.playerOrMaster === 'master' ? (
            <button className={cn('btn  btn-outline-secondary btn-lg')}>
              Stop Game
            </button>
          ) : (
            <button className={cn('btn  btn-outline-secondary btn-lg')}>
              Exit
            </button>
          )}
        </div>
        <div className={s.issuesTitle}>Issues: </div>
        { (playerOrMaster.playerOrMaster === 'master') ? ( <div>
        <button className={cn('btn btn-secondary btn-lg')}>Run Round</button>
        <button className={cn('btn btn-secondary btn-lg')}>Restr Round</button>
        <button className={cn('btn btn-secondary btn-lg')}>Next ISSUE</button> </div>) : (<div />)}
        <div className={s.statistic}>
          <div className={s.cardWrapper}>
          <div className={s.playingCard}>100</div>
          <div className={s.statisticPercents}>40%</div>
          </div>
        </div>
      </div>
      <div className={s.score}>
        <div>Score</div>
        <div>Players</div>
      </div>
    </div>
  );
};

export default Game;
