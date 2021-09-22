import React from 'react';
import cn from 'classnames';
import s from './Game.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store-redux';
import PlayerIcon from '../../components/PlayerIcon/PlayerIcon';
import { IIssues } from '../../interface';
import IssueCard from '../../components/IssueCard/IssueCard';

const Game = () => {
  const playerOrMaster = useSelector(
    (state: RootState) => state.playerOrMaster
  );
  const members = useSelector((state: RootState) => state.members);
  const issues = useSelector((state: RootState) => state.issues);

  const returnScoreColumn = () => {
    return (
      <div className={s.score}>
        <div>Score: </div>
        <div>Players: </div>
        <div className={s.scoreCard}>10 SP </div>
        <div className={s.scoreCard}>Player </div>
        <div className={s.scoreCard}>20 SP </div>
        <div className={s.scoreCard}>Player 2</div>
        <div className={s.scoreCard}>30 SP </div>
        <div className={s.scoreCard}>Player 3</div>
      </div>
    );
  };

  const returnIssuesList = (issues: IIssues[]) => {
    return (
      <div className={s.issuesList}>
        {issues.map((issue: IIssues) => {
          return <IssueCard issue={issue} />;
        })}
      </div>
    );
  };

  return (
    <div className={s.game}>
      <div className={s.mainUnit}>
        <div>Компонент с spring planning</div>
        <div className={s.topSetting}>
          <div>
            Scram master:{' '}
            <PlayerIcon item={members.find((item) => item.is_diller)} />
          </div>
          {playerOrMaster.playerOrMaster === 'master' ? (
            <button className={cn('btn  btn-outline-secondary btn-lg h-25')}>
              Stop Game
            </button>
          ) : (
            <button className={cn('btn  btn-outline-secondary btn-lg h-25')}>
              Exit
            </button>
          )}
        </div>
        <div className={s.issuesTitle}>Issues: </div>
        {playerOrMaster.playerOrMaster === 'master' ? (
          <div>
            <button className={cn('btn btn-secondary btn-lg')}>
              Run Round
            </button>
            <button className={cn('btn btn-secondary btn-lg')}>
              Restr Round
            </button>
            <button className={cn('btn btn-secondary btn-lg')}>
              Next ISSUE
            </button>{' '}
          </div>
        ) : (
          <div />
        )}
        {returnIssuesList(issues)}
        {playerOrMaster.playerOrMaster === 'master' ? (
          <div className={s.statistic}>
            <div className={s.cardWrapper}>
              <div className={s.playingCard}>100</div>
              <div className={s.statisticPercents}>40%</div>
            </div>
          </div>
        ) : null}
      </div>
      {returnScoreColumn()}
    </div>
  );
};

export default Game;
