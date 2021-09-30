import cn from 'classnames';
import React from 'react';
import { useSelector } from 'react-redux';
import coffeImg from '../../assets/coffee.png';
import AdditionIssue from '../../components/AdditionIssue/AdditionIssue';
import IssueCard from '../../components/IssueCard/IssueCard';
import PlayerIcon from '../../components/PlayerIcon/PlayerIcon';
import Statistic from '../../components/Statistic/StatisticCards';
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
  const scores = useSelector((state: RootState) => state.allData.scores);

  const onSetIsCurrentIssue = (issueId: number): void => {
    api.setIssueAsCurrent(issueId, true);
  };

  const onSetScore = (score: TScore): void => {
    api.addScore(score);
  };

  const onDeleteIssue = (issueId: number) => {
    api.deleteIssue(issueId);
  };

  const currentInProcessing = () => issues.some((item) => item.isCurrent);

  const findUserScore = (
    userId: number | undefined,
    issueId: number | undefined,
  ) => {
    if (currentInProcessing()) {
      return 'In Processing';
    }

    if (userId === undefined) {
      return 'No id';
    }

    const score = scores.find(
      (item) => item.userId === userId && item.issueId === issueId);

    if (score?.score === 'cof') {
      return (<div><img src={coffeImg} alt='coffee' /></div>);
    }

    if (score === undefined) {
      return 'unknown';
    }

    return score.score + 'SP';
  };

  const returnScoreColumn = (issue: IIssue | undefined) => {
    return (
      <div className={s.score}>
        <div className={s.scoreTitle}>
          <div>Score: </div>

          <div>Players: </div>
        </div>
        {members.map((item) => {
          if (!item.isObserver)
            return (
              <div className={s.scoreRow}>
                <div className={s.scoreCard}>
                  {issue?.status === 'processing'
                    ? 'In Progress'
                    : findUserScore(item.id, issue?.id)}
                </div>

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
          return (
            <IssueCard
              issue={issue}
              key={ind}
              onSetIsCurrentIssue={() => onSetIsCurrentIssue(issue.id)}
              onDeleteIssue={() => onDeleteIssue(issue.id)}
            />
          );
        })}
        <AdditionIssue />
      </div>
    );
  };

  const returnPlayerCards = () => {
    return (
      <div className={s.pokerCardWrapper}>
        {POKER_CARDS.map((item) => (
          <button
            className={s.pokerCard}
            key={item}
            onClick={() => onSetScore(item)}
          >
            {item}
          </button>
        ))}
        <button
          className={s.pokerCard}
          key='coffeImg'
          onClick={() => onSetScore('cof')}
        >
          <img src={coffeImg} alt='coffee' />
        </button>
      </div>
    );
  };

  const selectNextIssue = () => {
    const currentIssue = issues.findIndex((item) => item.isCurrent);
    if (currentIssue > -1 && currentIssue + 1 < issues.length) {
      api.setIssueAsCurrent(issues[currentIssue + 1].id, true);
    }
  };

  const checkExistCurrentIssue = () => {
    return issues.some((item) => item.isCurrent);
  };

  const drawControlRoundBtn = () => {
    if (userData.isDiller) {
      if (checkExistCurrentIssue()) {
        const statusIssue = issues.find((item) => item.isCurrent)?.status;
        if (statusIssue === 'new') {
          return (
            <button
              className={cn('btn btn-secondary btn-lg')}
              onClick={() => api.startRound()}
            >
              Run Round
            </button>
          );
        } else if (statusIssue === 'processing') {
          return (
            <button
              className={cn('btn btn-secondary btn-lg')}
              onClick={() => api.stopRound()}
            >
              Stop Round
            </button>
          );
        }
        return (
          <div>
            <button
              className={cn('btn btn-secondary btn-lg')}
              onClick={() => api.startRound()}
            >
              Run Round
            </button>
            <button
              className={cn('btn btn-secondary btn-lg')}
              onClick={() => selectNextIssue()}
            >
              Next Round
            </button>
          </div>
        );
      } else return <div>Please select a issue</div>;
    } else return null;
  };

  const drawStatisticRound = () => {
    if (issues.find((item) => item.isCurrent)?.status === 'finished') {
      const idCurrentIssue = issues.find((item) => item.isCurrent)?.id;

      return (
        <div className={s.statisticWrapper}>
          <div className={s.statisticTitle}>Statistics: </div>
        <div className={s.statisticCardWrapper}>
          <Statistic idCurrentIssue={idCurrentIssue}/>
        </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={s.game}>
      <div className={s.mainUnit}>
        <div className={s.mainUnitTopic}>
          {issues.map((item: IIssue) => item.title.slice(0, 10)).join(', ')}
        </div>

        <div className={s.topSetting}>
          <div className={s.scramMasterCard}>
            Scram master:
            <PlayerIcon item={members.find((item) => item.isDiller)} />
          </div>

          {userData.isDiller ? (
            <button
              className={cn('btn  btn-outline-secondary btn-lg h-25')}
              onClick={() => api.stopGame()}
            >
              Stop Game
            </button>
          ) : (
            <button
              className={cn('btn  btn-outline-secondary btn-lg h-25')}
              onClick={() => api.leaveGame()}
            >
              Exit
            </button>
          )}
        </div>

        <div className={s.issuesTitle}>
          Issues: <br />{' '}
        </div>

        <div className={s.issuesCont}>
          {returnIssuesList(issues)}
          {drawControlRoundBtn()}
        </div>

        <div>{drawStatisticRound()}</div>
        {currentInProcessing() && !userData.isObserver
          ? returnPlayerCards()
          : null}
      </div>

      <div className={s.scoreCont}>
        {' '}
        {returnScoreColumn(issues.find((item) => item.isCurrent))}
      </div>
    </div>
  );
};

export default Game;
