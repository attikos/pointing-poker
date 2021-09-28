import cn from 'classnames';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import coffeImg from '../../assets/coffee.png';
import IssueCard from '../../components/IssueCard/IssueCard';
import PlayerIcon from '../../components/PlayerIcon/PlayerIcon';
import { IIssue } from '../../interface';
import api from '../../services/api';
import { RootState } from '../../store/store-redux';
import { TScore } from '../../types';
import s from './Game.module.scss';

const POKER_CARDS: TScore[] = [
  '0',
  '1/2',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
  '?',
];

const Game = (): JSX.Element => {
  const userData = useSelector((state: RootState) => state.userData);
  const members = useSelector((state: RootState) => state.allData.members);
  const issues = useSelector((state: RootState) => state.allData.issues);
  const [isRoundNow, setIsRoundNow] = useState(false); // флаг, который показывает, идет ли сейчас раунд   const потому что ругается eslint

  const onSetIsCurrentIssue = (issueId: number):void => {
    api.setIssueAsCurrent(issueId, true);
  };

  const onSetScore = (score: TScore):void => {
    api.addScore(score);
  };

  /* TODO смена флага, когда все игроки проголосуют */

  /* TODO счет изменить, когда будет готова структура данных с сервера */
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

  const returnIssuesList = (iss: IIssue[]) => {
    return (
      <div className={s.issuesList}>
        {iss.map((issue: IIssue, ind: number) => {
          return <IssueCard issue={issue} key={ind} onSetIsCurrentIssue={() => onSetIsCurrentIssue(issue.id)}/>;
        })}
      </div>
    );
  };

  const returnPlayerCards = () => {
    return (
      <div className={s.pokerCardWrapper}>
        {POKER_CARDS.map((item) => (
          <button className={s.pokerCard} key={item} onClick={() => onSetScore(item)}>
            {item}
          </button>
        ))}
        <button className={s.pokerCard} key="coffeImg" onClick={() => onSetScore('cof')}>
          <img src={coffeImg} alt='coffee' />
        </button>
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
            <PlayerIcon item={members.find((item) => item.isDiller)} />
          </div>
          {userData.isDiller ? (
            <button className={cn('btn  btn-outline-secondary btn-lg h-25')}>
              Stop Game
            </button>
          ) : (
            <button className={cn('btn  btn-outline-secondary btn-lg h-25')}>
              Exit
            </button>
          )}
        </div>
        <div className={s.issuesTitle}>
          Issues: <br />{' '}
        </div>
        <div className={s.issuesCont}>
          {returnIssuesList(issues)}
          {userData.isDiller ? (
            <div>
              { !isRoundNow ? (
                <button
                  className={cn('btn btn-secondary btn-lg')}
                  onClick={() => setIsRoundNow(!isRoundNow)}
                >
                  Run Round
                </button>
              ) : (
                <div>
                  <button
                    className={cn('btn btn-secondary btn-lg')}
                    onClick={() => setIsRoundNow(!isRoundNow)}
                  >
                    Restr Round
                  </button>
                  <button className={cn('btn btn-secondary btn-lg')}>
                    Next ISSUE
                  </button>{' '}
                </div>
              )}
            </div>
          ) : (
            <div />
          )}
        </div>
        {/* TODO  добавление статистики для мастера поменять*/}
        {userData.isDiller ? (
          <div className={s.statistic}>
            <div className={s.cardWrapper}>
              <div className={s.playingCard}>100</div>
              <div className={s.statisticPercents}>40%</div>
            </div>
          </div>
        ) : null}
        {isRoundNow ? returnPlayerCards() : null}
      </div>
      <div className={s.scoreCont}> {returnScoreColumn()}</div>
    </div>
  );
};

export default Game;
