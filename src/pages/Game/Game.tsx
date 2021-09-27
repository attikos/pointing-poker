import React, { useState } from 'react';
import cn from 'classnames';
import s from './Game.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store-redux';
import PlayerIcon from '../../components/PlayerIcon/PlayerIcon';
import { IIssue } from '../../interface';
import IssueCard from '../../components/IssueCard/IssueCard';
import coffeImg from '../../assets/coffee.png';
import api from '../../services/api';

const POKER_CARDS: string[] = [
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
  const scores = useSelector((state: RootState) => state.allData.scores);
  const [isRoundNow, setIsRoundNow] = useState(false); // флаг, который показывает, идет ли сейчас раунд   const потому что ругается eslint

  /* TODO смена флага, когда все игроки проголосуют */
  const findUserScore = (userId: number | undefined, issueId: number | undefined) => {
    if (userId === undefined) return 'No id';
    const score = scores.find((item) => item.userId === userId && item.issueId === issueId);
    if (score === undefined) return 'unknown';
    else return score.score + 'SP';
  };

  
  const returnScoreColumn = ( issueId: number | undefined) => {
    return (
      <div className={s.score}>
        <div className={s.scoreTitle}>
          <div>Score: </div>
          <div>Players: </div>
        </div>
        {members.map((item) => {
          console.log(item);
          if (!item.isObserver)
            return (
              <div className={s.scoreRow}>
                <div className={s.scoreCard}>{findUserScore(item.id, issueId)} </div>
                <PlayerIcon item={item} />
              </div>
            );
        })}
      </div>
    );
  };

  const returnIssuesList = (iss: IIssue[]) => {
    return (
      <div className={s.issuesList}>
        {iss.map((issue: IIssue, ind: number) => {
          return <IssueCard issue={issue} key={ind} />;
        })}
      </div>
    );
  };

  const returnPlayerCards = () => {
    return (
      <div className={s.pokerCardWrapper}>
        {POKER_CARDS.map((item) => (
          <button className={s.pokerCard} key={item}>
            {item}
          </button>
        ))}
        <button className={s.pokerCard}>
          <img src={coffeImg} alt='coffee' />
        </button>
      </div>
    );
  };

  const selectNextIssue = () => {
    // TODO api.addScore();
    const currentIssue = issues.findIndex((item) => item.isCurrent);
    api.setIssueAsCurrent(issues[currentIssue + 1].id, false);
    if (currentIssue > -1 && currentIssue + 1 < issues.length) {
      api.setIssueAsCurrent(issues[currentIssue + 1].id, true);
    } else {
      api.cancelGame();
    }
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
              {!isRoundNow ? (
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
                  <button
                    className={cn('btn btn-secondary btn-lg')}
                    onClick={() => selectNextIssue()}
                  >
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
        {isRoundNow && !userData.isObserver ? returnPlayerCards() : null}
      </div>
      <div className={s.scoreCont}> {returnScoreColumn(issues.find((item) => item.isCurrent)?.id)}</div>
    </div>
  );
};

export default Game;
